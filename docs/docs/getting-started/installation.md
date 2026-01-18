---
sidebar_position: 1
---

# Installation

Install the packages you need based on your use case.

## Full Installation (Recommended)

Install both the library and CLI to write workflows in TypeScript and generate YAML files:

```bash npm2yarn
npm install --save-dev @github-actions-workflow-ts/lib @github-actions-workflow-ts/cli
```

## Library Only

If you only want to generate workflow JSON objects and handle YAML file generation yourself, install just the zero-dependency library:

```bash npm2yarn
npm install --save-dev @github-actions-workflow-ts/lib
```

The library package has **zero dependencies** and works in both ESM and CommonJS projects.

## Typed Actions

For full type safety when using popular GitHub Actions, install the typed actions package:

```bash npm2yarn
npm install --save-dev @github-actions-workflow-ts/actions
```

This package provides typed wrappers for actions from `actions/*`, `docker/*`, `aws-actions/*`, and other popular third-party actions. You get:

- **Typed `with` inputs** - autocomplete and type checking for action inputs
- **Typed outputs** - access step outputs with full type safety
- **Version-specific classes** - e.g., `ActionsSetupNodeV4` for `actions/setup-node@v4`

See the [Typed Actions guide](/docs/guides/typed-actions) for more details.

## Requirements

- Node.js 18 or higher
- TypeScript 5.0 or higher (recommended)
