import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
  ExtendedWorkflowTypes,
} from '../packages/lib/src/index.js'

const nodeVersions: ExtendedWorkflowTypes.MatrixConfiguration = [18, 20, 22]

const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})

const installNode = new Step({
  name: 'Install Node',
  uses: 'actions/setup-node@v4',
  with: { 'node-version': ex.expn('matrix.node') },
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

const runBuild = new Step({
  name: 'Run Build',
  run: 'pnpm build',
})

const runTests = new Step({
  name: 'Run Tests',
  run: 'pnpm test',
})

const testJob = new NormalJob('Tests', {
  'runs-on': 'ubuntu-latest',
  permissions: {
    contents: 'write',
  },
  strategy: {
    matrix: {
      node: nodeVersions,
    },
  },
}).addSteps([
  checkout,
  installNode,
  installPnpm,
  installDependencies,
  runBuild,
  runTests,
])

export const test = new Workflow('test', {
  name: 'Tests',
  on: {
    pull_request: {
      branches: ['main'],
    },
    push: {
      branches: ['main'],
    },
  },
}).addJob(testJob)
