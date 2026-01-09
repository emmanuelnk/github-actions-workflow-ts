/**
 * Typed Actions Example
 *
 * This example demonstrates the usage of typed GitHub Actions from the
 * @github-actions-workflow-ts/actions package.
 *
 * Benefits:
 * - Typed `with` inputs with JSDoc descriptions
 * - Typed `outputs` accessors for step outputs
 * - Auto-completed action versions (no more typos!)
 *
 * IMPORTANT: You have to export the workflow from this file for it to be generated.
 */
import {
  Workflow,
  NormalJob,
  expressions as ex,
  dedentString,
  Step,
} from '../packages/lib/src/index.js'
import {
  ActionsCheckoutV4,
  ActionsSetupNodeV4,
  ActionsCacheV4,
  ActionsUploadArtifactV4,
  ActionsDownloadArtifactV4,
  ActionsGithubScriptV7,
} from '../packages/actions/src/index.js'

// Typed checkout with all available options
const checkout = new ActionsCheckoutV4({
  id: 'checkout',
  name: 'Checkout repository',
  with: {
    'fetch-depth': 0, // Full history for changelog generation
    'persist-credentials': false,
  },
})

// Typed setup-node with autocomplete for cache options
const setupNode = new ActionsSetupNodeV4({
  id: 'setup-node',
  name: 'Setup Node.js',
  uses: 'actions/setup-node@v4',
  with: {
    'node-version': '20.x',
    cache: 'pnpm',
  },
})

const echoNodeVersion = new Step({
  name: 'Echo Node Version',
  run: `echo "Node version: ${setupNode.outputs['node-version']}"`,
})

// Access typed outputs - no more guessing output names!
// setupNode.outputs['node-version'] -> '${{ steps.setup-node.outputs.node-version }}'
// setupNode.outputs['cache-hit'] -> '${{ steps.setup-node.outputs.cache-hit }}'

// Typed cache action
const cacheNodeModules = new ActionsCacheV4({
  id: 'cache-deps',
  name: 'Cache dependencies',
  with: {
    path: 'node_modules',
    key: `deps-\${{ hashFiles('**/pnpm-lock.yaml') }}`,
    'restore-keys': 'deps-',
  },
})

// Upload build artifacts with typed inputs
const uploadArtifact = new ActionsUploadArtifactV4({
  name: 'Upload build artifact',
  with: {
    name: 'dist',
    path: 'dist/',
    'retention-days': 7,
  },
})

// Download artifacts in another job
const downloadArtifact = new ActionsDownloadArtifactV4({
  name: 'Download build artifact',
  with: {
    name: 'dist',
    path: 'dist/',
  },
})

// GitHub Script action with typed inputs
// Using dedentString() to cleanly format inline multi-line scripts
const commentOnPR = new ActionsGithubScriptV7({
  name: 'Comment on PR',
  if: ex.expn("github.event_name == 'pull_request'"),
  with: {
    script: dedentString(`
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: '✅ Build succeeded!'
      })
    `),
  },
})

// Build job using typed actions
const buildJob = new NormalJob('build', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 10,
})
  .addStep(checkout)
  .addStep(setupNode)
  .addStep(echoNodeVersion)
  .addStep(cacheNodeModules)
  .addStep(
    new ActionsSetupNodeV4({
      name: 'Skip install if cache hit',
      if: ex.expn(`steps.${cacheNodeModules.id}.outputs.cache-hit != 'true'`),
      with: {
        'node-version': '20.x',
      },
    }),
  )
  .addStep(uploadArtifact)
  .addStep(commentOnPR)

// Deploy job that uses outputs from build
const deployJob = new NormalJob('deploy', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 5,
  needs: ['build'],
  if: ex.expn("github.ref == 'refs/heads/main'"),
})
  .addStep(
    new ActionsCheckoutV4({
      name: 'Checkout',
    }),
  )
  .addStep(downloadArtifact)
  .addStep(
    new ActionsSetupNodeV4({
      id: 'node',
      name: 'Setup Node for deployment',
      with: {
        'node-version': '20.x',
      },
    }),
  )

// Export the workflow
export const typedActionsWorkflow = new Workflow('typed-actions', {
  name: 'TypedActionsExample',
  on: { workflow_dispatch: {} },
})
  .addJob(buildJob)
  .addJob(deployJob)
