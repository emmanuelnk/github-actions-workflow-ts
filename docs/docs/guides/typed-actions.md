---
sidebar_position: 2
---

# Typed Actions

The `@github-actions-workflow-ts/actions` package provides typed wrappers for popular GitHub Actions.

## Installation

```bash npm2yarn
npm install --save-dev @github-actions-workflow-ts/actions
```

## Basic Usage

```typescript
import { Workflow, NormalJob } from '@github-actions-workflow-ts/lib'
import {
  ActionsCheckoutV4,
  ActionsSetupNodeV4,
} from '@github-actions-workflow-ts/actions'

const checkout = new ActionsCheckoutV4({
  name: 'Checkout code',
  with: {
    'fetch-depth': 0, // TypeScript validates this is a valid input
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
console.log(setupNode.outputs['node-version'])
// '${{ steps.setup-node.outputs.node-version }}'

const job = new NormalJob('build', { 'runs-on': 'ubuntu-latest' })
  .addStep(checkout)
  .addStep(setupNode)
```

## Available Actions

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
| aws-actions/configure-aws-credentials | `AwsActionsConfigureAwsCredentialsV3`, `AwsActionsConfigureAwsCredentialsV4`, `AwsActionsConfigureAwsCredentialsV5` | [GitHub](https://github.com/aws-actions/configure-aws-credentials) |
| docker/build-push-action | `DockerBuildPushActionV5`, `DockerBuildPushActionV6` | [GitHub](https://github.com/docker/build-push-action) |
| docker/login-action | `DockerLoginActionV2`, `DockerLoginActionV3` | [GitHub](https://github.com/docker/login-action) |
| docker/setup-buildx-action | `DockerSetupBuildxActionV2`, `DockerSetupBuildxActionV3` | [GitHub](https://github.com/docker/setup-buildx-action) |
| peaceiris/actions-gh-pages | `PeaceirisActionsGhPagesV3`, `PeaceirisActionsGhPagesV4` | [GitHub](https://github.com/peaceiris/actions-gh-pages) |

## Version Validation

When using typed actions, the CLI validates that your action version matches the expected version. For example, if you use `ActionsCheckoutV4` but override the `uses` field to `actions/checkout@v3`, a warning will be emitted.

### Diagnostic Codes

| Code | Description |
|------|-------------|
| `action-version-unverifiable` | The action version cannot be verified (non-semver ref like `@main`) |
| `action-version-semver-violation` | The action version doesn't satisfy the expected constraint |

### Suppressing Warnings

#### Using `suppressWarnings` prop

```typescript
const checkout = new ActionsCheckoutV4({
  uses: 'actions/checkout@v3',
  suppressWarnings: ['action-version-semver-violation'],
})
```

#### Using `Diagnostics.suppress()`

```typescript
import { Diagnostics } from '@github-actions-workflow-ts/lib'

const checkout = new ActionsCheckoutV4({
  uses: Diagnostics.suppress(
    'actions/checkout@v3',
    'action-version-semver-violation',
    'Using v3 for legacy compatibility'
  ),
})
```

#### Using Configuration

In `wac.config.json`:

```json
{
  "diagnostics": {
    "rules": {
      "action-version-semver-violation": {
        "severity": "warn",
        "exclude": ["actions/checkout@v3"]
      }
    }
  }
}
```

## Requesting New Actions

If there's an action you'd like to see added, [open an issue](https://github.com/emmanuelnk/github-actions-workflow-ts/issues/new) or see [Adding Actions](/docs/contributing/adding-actions) to contribute it yourself.
