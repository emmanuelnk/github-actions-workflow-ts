import { Workflow, NormalJob, Step, multilineString } from '../src'

const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})

const installNode = new Step({
  name: 'Install Node',
  uses: 'actions/setup-node@v4',
  with: { 'node-version': 20 },
})

const installGlobalTsx = new Step({
  name: 'Install tsx',
  run: 'npm install -g tsx',
})

const installPnpm = new Step({
  name: 'Install pnpm',
  uses: 'pnpm/action-setup@v4',
  with: { version: 8 },
})

const installDependencies = new Step({
  name: 'Install Dependencies',
  run: 'pnpm install --no-frozen-lockfile',
})

const generateWorkflowTypes = new Step({
  name: 'Generate Workflow Types',
  run: 'pnpm generate-workflow-types',
})

const gitDiff = new Step({
  name: 'Get git diff',
  run: `git diff -- ':!pnpm-lock.yaml'`,
})

const isGitDiffEmpty = new Step({
  name: 'Fail if git diff is not empty',
  run: multilineString(
    `if test -z "$(git diff --name-only -- ':!pnpm-lock.yaml')"; then`,
    `  echo "No file changes detected."`,
    `  exit 0`,
    `else`,
    `  echo "File changes detected."`,
    `  git diff -- ':!pnpm-lock.yaml'`,
    `  exit 1`,
    `fi`,
  ),
})

const schemaChangeCheck = new NormalJob('SchemaChangeCheck', {
  'runs-on': 'ubuntu-latest',
  permissions: {
    contents: 'write',
  },
}).addSteps([
  checkout,
  installNode,
  installGlobalTsx,
  installPnpm,
  installDependencies,
  generateWorkflowTypes,
  gitDiff,
  isGitDiffEmpty,
])

export const schemaChangeCheckWorkflow = new Workflow('schema-change-check', {
  name: 'Schema Change Check',
  on: {
    pull_request: {
      types: ['opened', 'reopened', 'synchronize'],
    },
    schedule: [{ cron: '0 0 * * *' }],
  },
}).addJob(schemaChangeCheck)
