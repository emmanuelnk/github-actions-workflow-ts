import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
} from '../packages/lib/src/index.js'

const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})

const installNode = new Step({
  name: 'Setup Node.js',
  uses: 'actions/setup-node@v4',
  with: { 'node-version': 20 },
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

const buildDocs = new Step({
  name: 'Build Docs',
  run: 'pnpm --filter docs build',
})

const installVercelCli = new Step({
  name: 'Install Vercel CLI',
  run: 'pnpm add -g vercel@latest',
})

const pullVercelEnv = new Step({
  name: 'Pull Vercel Environment Information',
  run: 'vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}',
})

const buildVercelProject = new Step({
  name: 'Build Project Artifacts',
  run: 'vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}',
})

const deployToVercel = new Step({
  name: 'Deploy to Vercel',
  run: 'vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}',
})

const deployJob = new NormalJob('DeployDocs', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 15,
  env: {
    VERCEL_ORG_ID: ex.secret('VERCEL_ORG_ID'),
    VERCEL_PROJECT_ID: ex.secret('VERCEL_PROJECT_ID'),
  },
}).addSteps([
  checkout,
  installNode,
  installPnpm,
  installDependencies,
  buildDocs,
  installVercelCli,
  pullVercelEnv,
  buildVercelProject,
  deployToVercel,
])

export const deployDocs = new Workflow('deploy-docs', {
  name: 'Deploy Docs',
  on: {
    push: {
      branches: ['main'],
      paths: ['docs/**', 'packages/*/src/**'],
    },
    workflow_dispatch: {},
  },
}).addJob(deployJob)
