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
      <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/actions/workflows/schema-change-check.yml">
      <img src="https://github.com/emmanuelnk/github-actions-workflow-ts/actions/workflows/schema-change-check.yml/badge.svg" alt="Schema Change Check">
  </a>
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/actions">
      <img src="https://emmanuelnk.github.io/github-actions-workflow-ts/badges/coverage.svg" alt="coverage">
  </a>
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/issues">
      <img src="https://img.shields.io/github/issues/emmanuelnk/github-actions-workflow-ts.svg" alt="issues">
  </a>
</p>

## Quick Install

```bash
npm install --save-dev \
  @github-actions-workflow-ts/lib \      # types for workflows
  @github-actions-workflow-ts/cli \      # generates the yaml
  @github-actions-workflow-ts/actions    # types for popular gha actiions
```

## Quick Example

```typescript
// workflows/ci.wac.ts
import { 
  Workflow, 
  NormalJob, 
  Step, 
  expressions as ex, 
  dedentString as ds 
} from '@github-actions-workflow-ts/lib'
import { 
  ActionsCheckoutV4, 
  ActionsSetupNodeV4
} from '@github-actions-workflow-ts/actions'

// Typed actions give you autocomplete on `with` inputs and typed `outputs`
const checkout = new ActionsCheckoutV4({
  name: 'Checkout',
})

const setupNode = new ActionsSetupNodeV4({
  id: 'setup-node',
  name: 'Setup Node.js',
  with: {
    'node-version': '20.x',  // ← autocomplete for all valid inputs
    cache: 'npm',
  },
})

// Plain steps work too — use whichever style fits
const script = new Step({
  name: 'Simple script',
  run: ds(`
    for i in {1..5}; do
      if [ $i -eq 3 ]; then
        echo "This is number three!"
      else
        echo "Number: $i"
      fi
    done
  `)
})

const test = new Step({
  name: 'Run tests',
  run: 'npm test',
  env: {
    CI: 'true',
    NODE_AUTH_TOKEN: ex.secret('NPM_TOKEN'),  // ← expression helpers -> ${{ secrets.NPM_TOKEN }}
  },
})


const testJob = new NormalJob('test', {
  'runs-on': 'ubuntu-latest',
}).addSteps([checkout, setupNode, script, test])

// Every Workflow instance MUST be exported
export const ci = new Workflow('ci', {
  name: 'CI',
  on: {
    push: { branches: ['main'] },
    pull_request: { branches: ['main'] },
  },
}).addJobs([testJob])
```

Generate the YAML:

```bash
# creates .github/workflows/ci.yml
npx gwf build
```

See more examples in the [./examples](./examples) folder and their respective output in [./.github/workflows](./.github/workflows).

## Documentation

**[View Full Documentation](https://github-actions-workflow-ts.vercel.app/)**

- [Installation](https://github-actions-workflow-ts.vercel.app/docs/getting-started/installation)
- [Quick Start](https://github-actions-workflow-ts.vercel.app/docs/getting-started/quick-start)
- [Writing Workflows](https://github-actions-workflow-ts.vercel.app/docs/guides/writing-workflows)
- [Helpers](https://github-actions-workflow-ts.vercel.app/docs/core-concepts/helpers)
- [Typed Actions](https://github-actions-workflow-ts.vercel.app/docs/guides/typed-actions)
- [API Reference](https://github-actions-workflow-ts.vercel.app/docs/api-reference)

## Packages

| Package | Description |
|---------|-------------|
| [@github-actions-workflow-ts/lib](https://www.npmjs.com/package/@github-actions-workflow-ts/lib) | Core lib for generating workflow JSON objects |
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
