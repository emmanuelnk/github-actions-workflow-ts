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

const deployToGhPages = new Step({
  name: 'Deploy to GitHub Pages',
  uses: 'peaceiris/actions-gh-pages@v4',
  with: {
    github_token: ex.secret('GITHUB_TOKEN'),
    publish_dir: './docs/build',
    cname: ex.var('DOCS_CNAME'),
  },
})

const deployJob = new NormalJob('DeployDocs', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 15,
  permissions: {
    contents: 'write',
  },
}).addSteps([
  checkout,
  installNode,
  installPnpm,
  installDependencies,
  buildDocs,
  deployToGhPages,
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
