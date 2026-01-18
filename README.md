# github-actions-workflow-ts

Write GitHub Actions workflows in TypeScript instead of YAML!

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
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/actions/workflows/test.yml">
      <img src="https://github.com/emmanuelnk/github-actions-workflow-ts/actions/workflows/test.yml/badge.svg" alt="Tests">
  </a>
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/actions">
      <img src="https://github-actions-workflow-ts.vercel.app/badges/coverage.svg" alt="coverage">
  </a>
</p>

## Quick Install

```bash
npm install --save-dev @github-actions-workflow-ts/lib @github-actions-workflow-ts/cli
```

## Quick Example

```typescript
// workflows/ci.wac.ts
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

const testJob = new NormalJob('test', {
  'runs-on': 'ubuntu-latest',
}).addStep(new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})).addStep(new Step({
  name: 'Run tests',
  run: 'npm test',
}))

// Every Workflow instance MUST be exported
export const ci = new Workflow('ci', {
  name: 'CI',
  on: {
    push: { branches: ['main'] },
    pull_request: { branches: ['main'] },
  },
}).addJob(testJob)
```

Generate the YAML:

```bash
npx gwf build
```

## Documentation

**[View Full Documentation](https://github-actions-workflow-ts.vercel.app/)**

- [Installation](https://github-actions-workflow-ts.vercel.app/docs/getting-started/installation)
- [Quick Start](https://github-actions-workflow-ts.vercel.app/docs/getting-started/quick-start)
- [Writing Workflows](https://github-actions-workflow-ts.vercel.app/docs/guides/writing-workflows)
- [Typed Actions](https://github-actions-workflow-ts.vercel.app/docs/guides/typed-actions)
- [API Reference](https://github-actions-workflow-ts.vercel.app/docs/api-reference)

## Packages

| Package | Description |
|---------|-------------|
| [@github-actions-workflow-ts/lib](https://www.npmjs.com/package/@github-actions-workflow-ts/lib) | Core library (zero dependencies) |
| [@github-actions-workflow-ts/cli](https://www.npmjs.com/package/@github-actions-workflow-ts/cli) | CLI for generating YAML files |
| [@github-actions-workflow-ts/actions](https://www.npmjs.com/package/@github-actions-workflow-ts/actions) | Typed wrappers for popular actions |

## Try It Out

Explore on CodeSandbox:
- [Simple Example](https://codesandbox.io/p/devbox/github-actions-workflow-ts-2vthc5?file=%2Fsrc%2Fworkflows%2Fsimple.example.wac.ts)
- [Advanced Example](https://codesandbox.io/p/devbox/github-actions-workflow-ts-2vthc5?file=%2Fsrc%2Fworkflows%2Fadvanced.example.wac.ts)

## Contributing

See the [Contributing Guide](https://github-actions-workflow-ts.vercel.app/docs/contributing/development-setup)

## License

MIT
