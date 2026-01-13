# @github-actions-workflow-ts/actions

Typed wrappers for popular GitHub Actions. Use these with `@github-actions-workflow-ts/lib` to get full type safety for action inputs and outputs.

## Installation

```bash
npm install @github-actions-workflow-ts/actions
# or
pnpm add @github-actions-workflow-ts/actions
```

## Usage

```typescript
import { Workflow, NormalJob } from '@github-actions-workflow-ts/lib'
import { ActionsCheckoutV4, ActionsSetupNodeV4 } from '@github-actions-workflow-ts/actions'

const checkout = new ActionsCheckoutV4({
  name: 'Checkout code',
  // fields are validated and typed with descriptions 
  with: {
    'fetch-depth': 0,
  },
})

const setupNode = new ActionsSetupNodeV4({
  id: 'setup-node',
  name: 'Setup Node.js',
  with: {
    'node-version': '20.x',
    cache: 'pnpm',
  },
})

// Access typed outputs
console.log(setupNode.outputs['node-version'])  // '${{ steps.setup-node.outputs.node-version }}'
console.log(setupNode.outputs['cache-hit'])     // '${{ steps.setup-node.outputs.cache-hit }}'

// typical usage
const echoNodeVersion = new Step({
  name: 'Echo Node Version',
  run: `echo "Node version: ${setupNode.outputs['node-version']}"`,
})
// // will output:
//       - name: Echo Node Version
//         run: 'echo "Node version: ${{ steps.setup-node.outputs.node-version }}"'

const job = new NormalJob('build', { 'runs-on': 'ubuntu-latest' })
  .addStep(checkout)
  .addStep(setupNode)
```

## Available Actions

<!-- GENERATED-ACTIONS-TABLE:START -->
| Action | Versions | Links |
|--------|----------|-------|
| actions/cache | `ActionsCacheV3`, `ActionsCacheV4` | [GitHub](https://github.com/actions/cache) · [Marketplace](https://github.com/marketplace/actions/cache) |
| actions/checkout | `ActionsCheckoutV3`, `ActionsCheckoutV4`, `ActionsCheckoutV5`, `ActionsCheckoutV6` | [GitHub](https://github.com/actions/checkout) · [Marketplace](https://github.com/marketplace/actions/checkout) |
| actions/download-artifact | `ActionsDownloadArtifactV3`, `ActionsDownloadArtifactV4` | [GitHub](https://github.com/actions/download-artifact) · [Marketplace](https://github.com/marketplace/actions/download-artifact) |
| actions/github-script | `ActionsGithubScriptV6`, `ActionsGithubScriptV7`, `ActionsGithubScriptV8` | [GitHub](https://github.com/actions/github-script) · [Marketplace](https://github.com/marketplace/actions/github-script) |
| actions/setup-node | `ActionsSetupNodeV3`, `ActionsSetupNodeV4` | [GitHub](https://github.com/actions/setup-node) · [Marketplace](https://github.com/marketplace/actions/setup-node) |
| actions/setup-python | `ActionsSetupPythonV4`, `ActionsSetupPythonV5` | [GitHub](https://github.com/actions/setup-python) · [Marketplace](https://github.com/marketplace/actions/setup-python) |
| actions/upload-artifact | `ActionsUploadArtifactV3`, `ActionsUploadArtifactV4` | [GitHub](https://github.com/actions/upload-artifact) · [Marketplace](https://github.com/marketplace/actions/upload-artifact) |
| aws-actions/amazon-ecr-login | `AwsActionsAmazonEcrLoginV2` | [GitHub](https://github.com/aws-actions/amazon-ecr-login) · [Marketplace](https://github.com/marketplace/actions/amazon-ecr-login) |
| aws-actions/amazon-ecs-deploy-task-definition | `AwsActionsAmazonEcsDeployTaskDefinitionV2` | [GitHub](https://github.com/aws-actions/amazon-ecs-deploy-task-definition) · [Marketplace](https://github.com/marketplace/actions/amazon-ecs-deploy-task-definition) |
| aws-actions/amazon-ecs-render-task-definition | `AwsActionsAmazonEcsRenderTaskDefinitionV1` | [GitHub](https://github.com/aws-actions/amazon-ecs-render-task-definition) · [Marketplace](https://github.com/marketplace/actions/amazon-ecs-render-task-definition) |
| aws-actions/aws-cloudformation-github-deploy | `AwsActionsAwsCloudformationGithubDeployV1` | [GitHub](https://github.com/aws-actions/aws-cloudformation-github-deploy) · [Marketplace](https://github.com/marketplace/actions/aws-cloudformation-github-deploy) |
| aws-actions/aws-codebuild-run-build | `AwsActionsAwsCodebuildRunBuildV1` | [GitHub](https://github.com/aws-actions/aws-codebuild-run-build) · [Marketplace](https://github.com/marketplace/actions/aws-codebuild-run-build) |
| aws-actions/configure-aws-credentials | `AwsActionsConfigureAwsCredentialsV3`, `AwsActionsConfigureAwsCredentialsV4`, `AwsActionsConfigureAwsCredentialsV5` | [GitHub](https://github.com/aws-actions/configure-aws-credentials) · [Marketplace](https://github.com/marketplace/actions/configure-aws-credentials) |
| docker/build-push-action | `DockerBuildPushActionV5`, `DockerBuildPushActionV6` | [GitHub](https://github.com/docker/build-push-action) · [Marketplace](https://github.com/marketplace/actions/build-push-action) |
| docker/login-action | `DockerLoginActionV2`, `DockerLoginActionV3` | [GitHub](https://github.com/docker/login-action) · [Marketplace](https://github.com/marketplace/actions/login-action) |
| docker/setup-buildx-action | `DockerSetupBuildxActionV2`, `DockerSetupBuildxActionV3` | [GitHub](https://github.com/docker/setup-buildx-action) · [Marketplace](https://github.com/marketplace/actions/setup-buildx-action) |
| github/codeql-action | `GithubCodeqlActionV2`, `GithubCodeqlActionV3` | [GitHub](https://github.com/github/codeql-action) · [Marketplace](https://github.com/marketplace/actions/codeql-action) |
| peaceiris/actions-gh-pages | `PeaceirisActionsGhPagesV3`, `PeaceirisActionsGhPagesV4` | [GitHub](https://github.com/peaceiris/actions-gh-pages) · [Marketplace](https://github.com/marketplace/actions/actions-gh-pages) |
| release-drafter/release-drafter | `ReleaseDrafterReleaseDrafterV6` | [GitHub](https://github.com/release-drafter/release-drafter) · [Marketplace](https://github.com/marketplace/actions/release-drafter) |
| softprops/action-gh-release | `SoftpropsActionGhReleaseV1`, `SoftpropsActionGhReleaseV2` | [GitHub](https://github.com/softprops/action-gh-release) · [Marketplace](https://github.com/marketplace/actions/action-gh-release) |
<!-- GENERATED-ACTIONS-TABLE:END -->

# Development
## Regenerating Types

To regenerate types after updating the tracked actions:

```bash
pnpm run generate-action-types
```

## Adding New Actions

Edit `packages/actions/scripts/config.ts` to add new actions to track, then run the generate command.
