import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
  dedentString,
} from '../packages/lib/src/index.js'

const betaReleaseStep = new Step({
  id: 'publish_beta_release',
  name: 'Publish beta release',
  uses: 'release-drafter/release-drafter@v6',
  with: {
    commitish: 'main',
    'config-name': 'release-drafter.prerelease.yml',
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

// Dispatches publish.yml instead of calling it as a reusable workflow: npm
// trusted publishing (OIDC) validates the top-level workflow's filename
// against the package's single trusted publisher, which is publish.yml.
// GITHUB_TOKEN-triggered events don't start workflows, but workflow_dispatch
// is exempt from that rule.
const publishBetaJob = new NormalJob('PublishBetaPackages', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 5,
  if: "github.event_name == 'push'",
  permissions: {
    actions: 'write',
  },
})
  .addStep(
    new Step({
      name: 'Dispatch publish workflow',
      run: dedentString(`
        gh workflow run publish.yml --repo ${ex.expn('github.repository')} \\
          -f tag_name="${ex.expn(`needs.${betaReleaseJob.name}.outputs.tag_name`)}" \\
          -f target_commitish="${ex.expn('github.sha')}"
      `),
      env: {
        GH_TOKEN: ex.secret('GITHUB_TOKEN'),
      },
    }),
  )
  .needs([betaReleaseJob])

const draftStep = new Step({
  name: 'Draft next release',
  uses: 'release-drafter/release-drafter@v6',
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
}).addStep(draftStep)

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
