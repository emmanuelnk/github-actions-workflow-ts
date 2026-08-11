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
  // npm trusted publishing (OIDC) requires Node >= 22.14
  with: { 'node-version': 24 },
})

const installPnpm = new Step({
  name: 'Install pnpm',
  uses: 'pnpm/action-setup@v4',
  // pnpm 10 supports OIDC trusted publishing; reads the same v9 lockfile
  with: { version: 10 },
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

// Auth is handled by npm trusted publishing (OIDC): the job's id-token
// permission lets pnpm mint a short-lived token from the runner's OIDC
// identity. The trusted publisher configured on npmjs.com must reference
// this workflow file (publish.yml).
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
})

const publishJob = new NormalJob('PublishPackages', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 20,
  permissions: {
    contents: 'write',
    'id-token': 'write',
  },
}).addSteps([
  checkout,
  installNode,
  installPnpm,
  installDependencies,
  build,
  bumpVersions,
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
    // Dispatched (not workflow_call) by draft.yml for beta releases: npm
    // trusted publishing validates the top-level workflow's filename, and a
    // package can only have one trusted publisher — so every publish must
    // run with publish.yml as the top-level workflow.
    workflow_dispatch: {
      inputs: {
        tag_name: { required: true, type: 'string' },
        target_commitish: { required: true, type: 'string' },
      },
    },
  },
}).addJobs([publishJob, commitVersionBumpJob])
