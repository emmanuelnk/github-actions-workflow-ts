import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
} from '../packages/lib/src/index.js'

const betaReleaseStep = new Step({
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
}).addStep(betaReleaseStep)

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
}).addJobs([betaReleaseJob, draftJob])
