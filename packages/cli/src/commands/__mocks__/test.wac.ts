import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})

const installNode = new Step({
  name: 'Install Node',
  uses: 'actions/setup-node@v3',
  with: { 'node-version': 18 },
})

const installPnpm = new Step({
  name: 'Install pnpm',
  uses: 'pnpm/action-setup@v4',
  with: { version: 9 },
})

const installDependencies = new Step({
  name: 'Install Dependencies',
  run: 'pnpm install --no-frozen-lockfile',
})

const runTests = new Step({
  name: 'Run Tests',
  run: 'pnpm test',
})

const testJob = new NormalJob('Test', {
  'runs-on': ['self-hosted', 'linux', 'x64', 'gpu'],
}).addSteps([checkout, installNode, installPnpm, installDependencies, runTests])

export const test = new Workflow('mock-test', {
  name: 'ExampleMockTests',
  on: {
    workflow_dispatch: {},
  },
}).addJob(testJob)
