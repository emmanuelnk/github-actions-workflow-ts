/**
 * Advanced example
 *
 * This example shows the usage of:
 * - expressions helper
 * - multilineString helper
 * - echoKeyValue helper
 *
 * IMPORTANT: You have to export the workflow from this file for it to be generated.
 */
import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
  echoKeyValue as echo,
  multilineString,
  ReusableWorkflowCallJob,
} from '../src'

// Like the experienced engineer you are, let us start by first defining some common reusable steps
const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})

const installPnpm = new Step({
  name: 'Install pnpm',
  uses: 'pnpm/action-setup@v4',
  id: 'pnpm-install',
  with: {
    version: 9,
    run_install: 'false',
  },
})

const getPnpmStoreDirectory = new Step({
  name: 'Get pnpm store directory',
  id: 'pnpm-cache',
  shell: 'bash',
  run: echo.toGithubOutput('STORE_PATH', '$(pnpm store path)'),
})

const setupNpmrc = new Step({
  name: 'Setup npmrc for Private Packages',
  run: multilineString(
    echo.to('@your-org:registry', 'https://npm.pkg.github.com', '.npmrc'),
    echo.to(
      '//npm.pkg.github.com/:_authToken',
      ex.secret('GITHUB_TOKEN'),
      '.npmrc',
    ),
  ),
})

const installDependencies = new Step({
  name: 'Install Dependencies',
  run: 'pnpm install --frozen-lockfile',
})

const sharedSteps = [
  checkoutStep,
  installPnpm,
  getPnpmStoreDirectory,
  setupNpmrc,
  installDependencies,
]

// Now that we have some steps, let's define some jobs
const testJob = new NormalJob('Test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 10,
  strategy: {
    matrix: {
      node: ['12.x', '14.x', '16.x'],
    },
  },
})
  .addSteps(sharedSteps)
  .addStep(
    new Step({
      name: 'Run Tests',
      run: 'pnpm run test',
    }),
  )

const buildJob = new NormalJob('Build', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 10,
  needs: [testJob.name],
})
  .addSteps(sharedSteps)
  .addStep(
    new Step({
      name: 'Build',
      run: 'pnpm run build',
      env: {
        VITE_APP_VERSION: ex.env('GITHUB_SHA'),
      },
    }),
  )

const deployJob = new NormalJob('Deploy', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 10,
  environment: ex.ternary("github.event_name == 'release'", "'prod'", "'dev'"),
  permissions: {
    contents: 'read',
    'id-token': 'write',
  },
})
  .needs([buildJob])
  .addSteps(sharedSteps)
  .addStep(
    new Step({
      name: 'Deploy',
      run: 'pnpm run deploy',
    }),
  )
  .addStep(
    new Step({
      name: 'Multi line yaml with special characters',
      run: multilineString(
        `content="\${content//$'\n'/'%0A'}"`,
        `content="\${content//$'\r'/'%0D'}"`,
      ),
    }),
  )

const releaseJob = new ReusableWorkflowCallJob('ReleaseJob', {
  uses: 'your-org/your-repo/.github/workflows/reusable-workflow.yml@main',
  secrets: 'inherit',
})

export const advancedWorkflow = new Workflow('advanced-1', {
  name: 'ExampleAdvanced',
  on: {
    workflow_dispatch: {},
  },
})
  .addEnvs({
    SENTRY_APP_NAME: 'ExampleAdvanced',
    SENTRY_ORG: 'example-org',
  })
  .addJob(testJob)
  .addJob(buildJob)
  .addJob(deployJob)
  .addJob(releaseJob)
