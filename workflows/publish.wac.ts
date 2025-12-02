import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
  multilineString,
} from '../packages/lib/src/index.js'

const targetCommitish = ex.expn('github.event.release.target_commitish')
const tagName = ex.expn('github.event.release.tag_name')

const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
  with: {
    ref: targetCommitish,
  },
})

const installNode = new Step({
  name: 'Install Node',
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

const build = new Step({
  name: 'Run Build',
  run: 'pnpm build',
})

const bumpVersions = new Step({
  name: 'Bump Versions',
  run: multilineString(
    `git config user.name github-actions`,
    `git config user.email github-actions@github.com`,
    `echo version: ${tagName}`,
    // Update version in both packages
    `cd packages/lib && npm version --no-git-tag-version ${tagName}`,
    `cd ../cli && npm version --no-git-tag-version ${tagName}`,
  ),
})

const setupNpmAuth = new Step({
  name: 'Setup npm auth',
  run: 'echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc',
  env: {
    NPM_TOKEN: ex.secret('NPM_TOKEN'),
  },
})

const publishPackages = new Step({
  name: 'Publish packages',
  run: 'pnpm -r publish --access public --no-git-checks',
  env: {
    NPM_TOKEN: ex.secret('NPM_TOKEN'),
  },
})

const publishJob = new NormalJob('PublishPackages', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 20,
  permissions: {
    contents: 'write',
  },
}).addSteps([
  checkout,
  installNode,
  installPnpm,
  installDependencies,
  build,
  bumpVersions,
  setupNpmAuth,
  publishPackages,
])

const commitVersionBumpJob = new NormalJob('CommitVersionBump', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 20,
  needs: [publishJob.name],
  permissions: {
    contents: 'write',
  },
}).addSteps([
  new Step({
    name: 'Checkout',
    uses: 'actions/checkout@v4',
    with: {
      ref: 'main',
    },
  }),
  new Step({
    name: 'Push updates to main branch',
    shell: 'bash',
    run: multilineString(
      `git config user.name github-actions`,
      `git config user.email github-actions@github.com`,
      `echo version: ${tagName}`,
      `cd packages/lib && npm version --no-git-tag-version ${tagName}`,
      `cd ../cli && npm version --no-git-tag-version ${tagName}`,
      `git add .`,
      `git commit -m "new release: ${tagName} [skip ci]" --no-verify`,
      `git push origin HEAD:main`,
    ),
  }),
])

export const publishWorkflow = new Workflow('publish', {
  name: 'Publish Release',
  on: {
    release: {
      types: ['published'],
    },
  },
}).addJobs([publishJob, commitVersionBumpJob])
