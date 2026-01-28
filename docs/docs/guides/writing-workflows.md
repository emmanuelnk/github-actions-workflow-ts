---
sidebar_position: 1
---

# Writing Workflows

Learn how to write GitHub Actions workflows using TypeScript.

## File Naming Convention

Workflow files must use the `.wac.ts` extension to be detected by the CLI:

```
workflows/
├── ci.wac.ts
├── deploy.wac.ts
└── release.wac.ts
```

## Exporting Workflows

**Important**: Every `Workflow` instance that you want to generate MUST be exported:

```typescript
// This workflow WILL be generated
export const ciWorkflow = new Workflow('ci', { /* ... */ })

// This workflow will NOT be generated (not exported)
const privateWorkflow = new Workflow('private', { /* ... */ })
```

You can export workflows in multiple ways:

```typescript
// Named export
export const myWorkflow = new Workflow('my-workflow', { /* ... */ })

// Default export
export default new Workflow('my-workflow', { /* ... */ })

// Multiple exports
export { workflowA, workflowB, workflowC }
```

## Multiple Workflows per File

You can define multiple workflows in a single file:

```typescript
// workflows/all.wac.ts
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

const sharedCheckout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})

export const testWorkflow = new Workflow('test', {
  name: 'Test',
  on: { push: {} },
}).addJob(
  new NormalJob('test', { 'runs-on': 'ubuntu-latest' }).addStep(sharedCheckout)
)

export const buildWorkflow = new Workflow('build', {
  name: 'Build',
  on: { push: {} },
}).addJob(
  new NormalJob('build', { 'runs-on': 'ubuntu-latest' }).addStep(sharedCheckout)
)
```

This generates two files: `.github/workflows/test.yml` and `.github/workflows/build.yml`.

## Custom Output Paths

For monorepos or special project structures, you can customize where workflow files are written.

### Per-Workflow Output Path

Set a custom output directory for individual workflows:

```typescript
// workflows/apps.wac.ts
import { Workflow, NormalJob } from '@github-actions-workflow-ts/lib'

// Output to: packages/app-a/.github/workflows/deploy.yml
export const appADeploy = new Workflow(
  'deploy',
  {
    name: 'Deploy App A',
    on: { push: { branches: ['main'] } },
  },
  { outputPath: 'packages/app-a/.github/workflows' }
)

// Output to: packages/app-b/.github/workflows/deploy.yml
export const appBDeploy = new Workflow(
  'deploy',
  {
    name: 'Deploy App B',
    on: { push: { branches: ['main'] } },
  },
  { outputPath: 'packages/app-b/.github/workflows' }
)
```

### Config-Based Output Paths

For more control, use `wac.config.json` to define output paths based on filename or path patterns:

```json
{
  "outputPaths": {
    "workflows": {
      "default": ".github/workflows",
      "overrides": [
        {
          "match": "packages/app-a/**/*.wac.ts",
          "path": "packages/app-a/.github/workflows"
        },
        {
          "match": "packages/app-b/**/*.wac.ts",
          "path": "packages/app-b/.github/workflows"
        },
        {
          "match": "*-shared.wac.ts",
          "path": ".github/workflows"
        }
      ]
    }
  }
}
```

The `match` pattern supports both filename patterns (e.g., `*-deploy.wac.ts`) and full path patterns (e.g., `packages/app-a/**/*.wac.ts`).

See the [Configuration guide](/docs/guides/configuration#outputpaths) for more details on output path options.

## Reusing Components

One of the main benefits of using TypeScript is the ability to reuse components:

```typescript
// workflows/shared/steps.ts
import { Step } from '@github-actions-workflow-ts/lib'

export const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})

export const setupNode = (version: number) =>
  new Step({
    name: 'Setup Node.js',
    uses: 'actions/setup-node@v4',
    with: { 'node-version': version },
  })

export const installDeps = new Step({
  name: 'Install Dependencies',
  run: 'npm ci',
})
```

```typescript
// workflows/ci.wac.ts
import { Workflow, NormalJob } from '@github-actions-workflow-ts/lib'
import { checkout, setupNode, installDeps } from './shared/steps'

const testJob = new NormalJob('test', { 'runs-on': 'ubuntu-latest' })
  .addStep(checkout)
  .addStep(setupNode(20))
  .addStep(installDeps)
  .addStep(new Step({ name: 'Test', run: 'npm test' }))

export const ci = new Workflow('ci', {
  name: 'CI',
  on: { push: {}, pull_request: {} },
}).addJob(testJob)
```

## Using Plain JSON

You can also use plain JSON objects with type annotations:

```typescript
import {
  Workflow,
  NormalJob,
  GeneratedWorkflowTypes as GWT,
} from '@github-actions-workflow-ts/lib'

const nodeSetupStep: GWT.Step = {
  name: 'Setup Node',
  uses: 'actions/setup-node@v4',
  with: {
    'node-version': '20',
  },
}

const job: GWT.NormalJob = {
  'runs-on': 'ubuntu-latest',
  steps: [nodeSetupStep],
}

export const workflow = new Workflow('example', {
  name: 'Example',
  on: { workflow_dispatch: {} },
  jobs: { build: job },
})
```

## Output Without YAML

If you only need the workflow object without generating YAML files:

```typescript
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

const workflow = new Workflow('example', {
  name: 'Example',
  on: { workflow_dispatch: {} },
})

// Access the generated workflow object
console.log(workflow.workflow)
// { name: 'Example', on: { workflow_dispatch: {} }, jobs: {} }
```
