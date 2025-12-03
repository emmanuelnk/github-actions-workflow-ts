# @github-actions-workflow-ts/lib

Type-safe GitHub Actions workflow builder library for TypeScript.

Stop writing workflows in YAML and use TypeScript instead!

<p align="center"><img src="https://github.com/emmanuelnk/github-actions-workflow-ts/assets/19330930/9121bb33-cd51-41f3-830f-9b4bd1117320" alt="github-actions-workflow-ts-logo" width="400"/></p>

<p align="center">
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts">
      <img src="https://raw.githubusercontent.com/ellerbrock/open-source-badges/master/badges/open-source-v1/open-source.png" alt="love opensource">
  </a>
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  </a>
  <a href="https://www.npmjs.com/package/@github-actions-workflow-ts/lib">
      <img src="https://img.shields.io/npm/v/@github-actions-workflow-ts/lib.svg" alt="npm version">
  </a>
</p>

## Installation

### Full Installation (recommended)

Install both the library and CLI to write workflows in TypeScript and generate YAML files:

```bash
npm install --save-dev @github-actions-workflow-ts/lib @github-actions-workflow-ts/cli
```

### Library Only

If you only want to generate workflow JSON objects and handle YAML file generation yourself, install just the zero-dependency library:

```bash
npm install --save-dev @github-actions-workflow-ts/lib
```

The library package has **zero dependencies** and works in both ESM and CommonJS projects.

## Quick Start

```ts
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})

const testJob = new NormalJob('Test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
})

export const exampleWorkflow = new Workflow('example-filename', {
  name: 'Example',
  on: {
    workflow_dispatch: {}
  }
})

testJob.addStep(checkoutStep)
exampleWorkflow.addJob(testJob)
```

## Documentation

For full documentation, examples, and API reference, visit the [main repository](https://github.com/emmanuelnk/github-actions-workflow-ts).

## Features

- **Type Safety**: Full TypeScript support with types generated from the official GitHub Actions Workflow JSON Schema
- **Zero Dependencies**: The library has no external dependencies
- **Dual Module Support**: Works with both ESM and CommonJS projects
- **Intuitive API**: Builder pattern for constructing workflows, jobs, and steps
- **Expression Helpers**: Utilities for GitHub Actions expressions like `${{ secrets.TOKEN }}`

## License

MIT
