---
sidebar_position: 3
---

# Migration from v1

If you're migrating from the legacy `github-actions-workflow-ts` or `github-actions-workflow-ts-lib` packages, follow these steps.

## Update Dependencies

Remove old packages and install new scoped packages:

```bash
# Remove old packages
npm uninstall github-actions-workflow-ts github-actions-workflow-ts-lib

# Install new scoped packages
npm install --save-dev @github-actions-workflow-ts/lib @github-actions-workflow-ts/cli
```

## Update Imports

Update your import statements to use the new scoped package names:

```diff
- import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts'
+ import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

- import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts-lib'
+ import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'
```

## CLI Commands

CLI commands remain the same:

```bash
npx gwf build
# or
npx generate-workflow-files build
```

## Breaking Changes

There are no breaking changes to the API. The only changes are:

1. Package names are now scoped under `@github-actions-workflow-ts/`
2. The library and CLI are now separate packages

## New Features in v2

After migrating, you can take advantage of new features:

- **Typed Actions**: Install `@github-actions-workflow-ts/actions` for type-safe action inputs
- **Diagnostics**: Version mismatch warnings when using typed actions
- **Zero dependencies**: The core library has no runtime dependencies
