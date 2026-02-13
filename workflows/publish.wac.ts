import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
  dedentString,
} from '../packages/lib/src/index.js'

const targetCommitish = ex.expn(
  'inputs.target_commitish || github.event.release.target_commitish',
)
const tagName = ex.expn('inputs.tag_name || github.event.release.tag_name')

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
  // Update version in both packages
  run: dedentString(`
    git config user.name github-actions
    git config user.email github-actions@github.com
    echo version: ${tagName}
    (cd packages/lib && npm version --no-git-tag-version ${tagName})
    (cd packages/cli && npm version --no-git-tag-version ${tagName})
    (cd packages/actions && npm version --no-git-tag-version ${tagName})
  `),
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
  run: dedentString(`
    TAG_NAME="${tagName}"
    if [[ "$TAG_NAME" == *"-alpha"* ]]; then
      echo "Publishing with alpha tag"
      pnpm -r publish --access public --tag alpha --no-git-checks
    elif [[ "$TAG_NAME" == *"-beta"* ]]; then
      echo "Publishing with beta tag"
      pnpm -r publish --access public --tag beta --no-git-checks
    else
      echo "Publishing with latest tag"
      pnpm -r publish --access public --no-git-checks
    fi
  `),
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
  // Skip this on prereleases (i.e. any release with a "-" in it, like 1.2.3-beta.0)
  if: "!contains(inputs.tag_name || github.event.release.tag_name, '-')",
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
    run: dedentString(`
      git config user.name github-actions
      git config user.email github-actions@github.com
      echo version: ${tagName}
      (cd packages/lib && npm version --no-git-tag-version ${tagName})
      (cd packages/cli && npm version --no-git-tag-version ${tagName})
      (cd packages/actions && npm version --no-git-tag-version ${tagName})
      git add .
      git commit -m "new release: ${tagName} [skip ci]" --no-verify
      git push origin HEAD:main
    `),
  }),
])

export const publishWorkflow = new Workflow('publish', {
  name: 'Publish Release',
  on: {
    release: {
      types: ['published'],
    },
    workflow_call: {
      inputs: {
        tag_name: { required: true, type: 'string' },
        target_commitish: { required: true, type: 'string' },
      },
      secrets: {
        NPM_TOKEN: { required: true },
      },
    },
  },
}).addJobs([publishJob, commitVersionBumpJob])
