import {
  Workflow,
  NormalJob,
  ReusableWorkflowCallJob,
  Step,
  expressions as ex,
} from '../packages/lib/src/index.js'

const betaReleaseStep = new Step({
  id: 'create_release',
  name: 'Publish beta release',
  uses: 'release-drafter/release-drafter@v5',
  with: {
    commitish: 'main',
    prerelease: true,
    'prerelease-identifier': 'beta',
    publish: true,
  },
  env: {
    GITHUB_TOKEN: ex.secret('GITHUB_TOKEN'),
  },
})

const betaReleaseJob = new NormalJob('PublishBetaRelease', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 20,
  if: "github.event_name == 'push'",
  permissions: {
    contents: 'write',
  },
  outputs: {
    tag_name: ex.expn(`steps.${betaReleaseStep.id}.outputs.tag_name`),
  },
}).addStep(betaReleaseStep)

const publishBetaJob = new ReusableWorkflowCallJob('PublishBetaPackages', {
  uses: './.github/workflows/publish.yml',
  if: "github.event_name == 'push'",
  permissions: {
    contents: 'write',
  },
  with: {
    tag_name: ex.expn(`needs.${betaReleaseJob.name}.outputs.tag_name`),
    target_commitish: ex.expn('github.sha'),
  },
  secrets: {
    NPM_TOKEN: ex.secret('NPM_TOKEN'),
  },
}).needs([betaReleaseJob])

const draftStep = new Step({
  name: 'Draft next release',
  uses: 'release-drafter/release-drafter@v5',
  with: {
    commitish: 'main',
  },
  env: {
    GITHUB_TOKEN: ex.secret('GITHUB_TOKEN'),
  },
})

const draftJob = new NormalJob('UpdateReleaseDraft', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 20,
  permissions: {
    contents: 'write',
  },
})
  .needs([
    // This job must run after the beta release because otherwise
    // release-drafter will delete the draft release.
    // See: https://github.com/release-drafter/release-drafter/issues/1509
    betaReleaseJob,
  ])
  .addStep(draftStep)

export const draftWorkflow = new Workflow('draft', {
  name: 'Draft Release',
  on: {
    push: {
      branches: ['main'],
    },
    pull_request: {
      types: ['opened', 'reopened', 'synchronize'],
    },
  },
  permissions: {
    contents: 'read',
  },
}).addJobs([betaReleaseJob, publishBetaJob, draftJob])
