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

## Version Validation & Diagnostics

When using typed actions, the CLI validates that the action version you specify matches the expected version. For example, if you use `ActionsCheckoutV4` but override the `uses` field to `actions/checkout@v3`, a warning will be emitted during build.

### Diagnostic Codes

| Code | Description |
|------|-------------|
| `action-version-unverifiable` | The action version cannot be verified because the git ref is not a valid semver (e.g., `@main`, `@feature-branch`) or the repository doesn't match |
| `action-version-semver-violation` | The action version doesn't satisfy the expected semver constraint (e.g., using `@v3` with a `V4` typed action) |

### Configuring Diagnostics

You can configure how these diagnostics are handled in your `wac.config.json`:

```json
{
  "diagnostics": {
    "rules": {
      "action-version-unverifiable": "off",
      "action-version-semver-violation": "error"
    }
  }
}
```

#### Severity Levels

- `"off"` - Suppress the diagnostic entirely
- `"warn"` - Emit as a warning (default behavior)
- `"error"` - Upgrade to an error

#### Advanced: Per-Action Rules

You can suppress diagnostics for specific actions while keeping them enabled for others:

```json
{
  "diagnostics": {
    "rules": {
      "action-version-semver-violation": {
        "severity": "error",
        "exclude": [
          "actions/checkout@*",
          "actions/setup-node@v3"
        ]
      }
    }
  }
}
```

The `exclude` array supports patterns:
- Exact match: `"actions/checkout@v3"`
- Wildcard version: `"actions/checkout@*"` (matches any version)
- Wildcard repo: `"actions/*"` (matches all actions from an org)

### Example: Intentionally Using an Older Version

If you need to use an older action version for compatibility reasons, you can suppress the warning in two ways:

#### Option 1: In-Code Suppression with `suppressWarnings` prop

```typescript
import { ActionsCheckoutV4 } from '@github-actions-workflow-ts/actions'

const checkout = new ActionsCheckoutV4({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
  suppressWarnings: ['action-version-semver-violation'],
})
```

#### Option 2: In-Code Suppression with `Diagnostics.suppress()`

```typescript
import { ActionsCheckoutV4 } from '@github-actions-workflow-ts/actions'
import { Diagnostics } from '@github-actions-workflow-ts/lib'

const checkout = new ActionsCheckoutV4({
  name: 'Checkout',
  uses: Diagnostics.suppress(
    'actions/checkout@v3',
    'action-version-semver-violation',
    'Using v3 for legacy compatibility' // optional reason
  ),
})
```

You can also suppress multiple codes:

```typescript
const checkout = new ActionsCheckoutV4({
  uses: Diagnostics.suppress(
    'actions/checkout@v3',
    ['action-version-semver-violation', 'action-version-unverifiable'],
  ),
})
```

#### Option 3: Configuration-based Suppression

Add to `wac.config.json`:

```json
{
  "diagnostics": {
    "rules": {
      "action-version-semver-violation": {
        "exclude": ["actions/checkout@v3"]
      }
    }
  }
}
```

## Available Actions

<!-- GENERATED-ACTIONS-TABLE:START -->
| Action | Versions | GitHub |
|--------|----------|--------|
| actions/cache | `ActionsCacheV3`, `ActionsCacheV4` | [GitHub](https://github.com/actions/cache) |
| actions/checkout | `ActionsCheckoutV3`, `ActionsCheckoutV4`, `ActionsCheckoutV5`, `ActionsCheckoutV6` | [GitHub](https://github.com/actions/checkout) |
| actions/download-artifact | `ActionsDownloadArtifactV3`, `ActionsDownloadArtifactV4` | [GitHub](https://github.com/actions/download-artifact) |
| actions/github-script | `ActionsGithubScriptV6`, `ActionsGithubScriptV7`, `ActionsGithubScriptV8` | [GitHub](https://github.com/actions/github-script) |
| actions/setup-node | `ActionsSetupNodeV3`, `ActionsSetupNodeV4` | [GitHub](https://github.com/actions/setup-node) |
| actions/setup-python | `ActionsSetupPythonV4`, `ActionsSetupPythonV5` | [GitHub](https://github.com/actions/setup-python) |
| actions/upload-artifact | `ActionsUploadArtifactV3`, `ActionsUploadArtifactV4` | [GitHub](https://github.com/actions/upload-artifact) |
| aws-actions/amazon-ecr-login | `AwsActionsAmazonEcrLoginV2` | [GitHub](https://github.com/aws-actions/amazon-ecr-login) |
| aws-actions/amazon-ecs-deploy-task-definition | `AwsActionsAmazonEcsDeployTaskDefinitionV2` | [GitHub](https://github.com/aws-actions/amazon-ecs-deploy-task-definition) |
| aws-actions/amazon-ecs-render-task-definition | `AwsActionsAmazonEcsRenderTaskDefinitionV1` | [GitHub](https://github.com/aws-actions/amazon-ecs-render-task-definition) |
| aws-actions/aws-cloudformation-github-deploy | `AwsActionsAwsCloudformationGithubDeployV1` | [GitHub](https://github.com/aws-actions/aws-cloudformation-github-deploy) |
| aws-actions/aws-codebuild-run-build | `AwsActionsAwsCodebuildRunBuildV1` | [GitHub](https://github.com/aws-actions/aws-codebuild-run-build) |
| aws-actions/configure-aws-credentials | `AwsActionsConfigureAwsCredentialsV3`, `AwsActionsConfigureAwsCredentialsV4`, `AwsActionsConfigureAwsCredentialsV5` | [GitHub](https://github.com/aws-actions/configure-aws-credentials) |
| docker/build-push-action | `DockerBuildPushActionV5`, `DockerBuildPushActionV6` | [GitHub](https://github.com/docker/build-push-action) |
| docker/login-action | `DockerLoginActionV2`, `DockerLoginActionV3` | [GitHub](https://github.com/docker/login-action) |
| docker/setup-buildx-action | `DockerSetupBuildxActionV2`, `DockerSetupBuildxActionV3` | [GitHub](https://github.com/docker/setup-buildx-action) |
| github/codeql-action | `GithubCodeqlActionV2`, `GithubCodeqlActionV3` | [GitHub](https://github.com/github/codeql-action) |
| peaceiris/actions-gh-pages | `PeaceirisActionsGhPagesV3`, `PeaceirisActionsGhPagesV4` | [GitHub](https://github.com/peaceiris/actions-gh-pages) |
| release-drafter/release-drafter | `ReleaseDrafterReleaseDrafterV6` | [GitHub](https://github.com/release-drafter/release-drafter) |
| softprops/action-gh-release | `SoftpropsActionGhReleaseV1`, `SoftpropsActionGhReleaseV2` | [GitHub](https://github.com/softprops/action-gh-release) |
<!-- GENERATED-ACTIONS-TABLE:END -->

## Diagnostics

### `action-version-unverifiable`

**severity:** ⚠️ warning

The action version provided cannot be verified. This may be for any of the following reasons:

- The repository specifier is different to the expected specifier. This may be due to a mistake in your workflow, or you may be using a fork of the repository. In the latter case, the semver version cannot be validated because the fork may not follow the same versioning as the upstream repository.

- The git reference is not a valid semver version. This may be due to a mistake in your workflow, or you may be using a commit SHA, branch name, or other git reference which is not a semver specifier.

If you see this warning then there is no guarantee that the TypeScript types for the actions inputs and outputs are valid for the action version you are using.

### `action-version-semver-violation`

**severity:** ⚠️ warning

The version of the action you are using does not satisfy the semver constraints required by the action. You may be seeing this warning for any of the following reasons:

- You have mistakenly specified the wrong semantic version tag.
- You have intentionally specified a different semantic version tag.
- You have recently updated `@github-actions-workflow-ts/actions` to a new version, and a new version of the action was published to GitHub.

If you see this warning then there is no guarantee that the TypeScript types for the actions inputs and outputs are valid for the action version you are using.

# Development
## Regenerating Types

To regenerate types after updating the tracked actions:

```bash
pnpm run generate-action-types
```

## Adding New Actions

Edit `packages/actions/scripts/config.ts` to add new actions to track, then run the generate command.
