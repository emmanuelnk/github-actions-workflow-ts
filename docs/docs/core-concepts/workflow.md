---
sidebar_position: 1
---

# Workflow

The `Workflow` class represents a GitHub Actions workflow.

## Constructor

```typescript
new Workflow(filename: string, workflow: WorkflowDefinition, options?: WorkflowOptions)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `filename` | `string` | The name of the generated YAML file (without `.yml` extension) |
| `workflow` | `object` | The workflow definition |
| `options` | `object` | Optional configuration for this workflow |

### Options

| Property | Type | Description |
|----------|------|-------------|
| `outputPath` | `string` | Custom output directory for this workflow. Overrides config file settings. |

```typescript
import { Workflow } from '@github-actions-workflow-ts/lib'

export const myWorkflow = new Workflow('ci', {
  name: 'CI Pipeline',
  on: {
    push: {
      branches: ['main'],
    },
    pull_request: {
      branches: ['main'],
    },
  },
})
```

### Custom Output Path

You can specify a custom output directory for individual workflows:

```typescript
import { Workflow } from '@github-actions-workflow-ts/lib'

// This workflow will be written to packages/app-a/.github/workflows/deploy.yml
export const deployWorkflow = new Workflow(
  'deploy',
  {
    name: 'Deploy App A',
    on: { push: { branches: ['main'] } },
  },
  { outputPath: 'packages/app-a/.github/workflows' }
)
```

The workflow-level `outputPath` takes precedence over any configuration in `wac.config.json`. See [Configuration](/docs/guides/configuration#outputpaths) for more options.

## Methods

### .addJob()

Add a single job to the workflow.

```typescript
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

const testJob = new NormalJob('test', {
  'runs-on': 'ubuntu-latest',
}).addStep(
  new Step({ name: 'Run tests', run: 'npm test' })
)

export const workflow = new Workflow('ci', {
  name: 'CI',
  on: { push: {} },
}).addJob(testJob)
```

### .addJobs()

Add multiple jobs at once.

```typescript
import { Workflow, NormalJob } from '@github-actions-workflow-ts/lib'

const testJob = new NormalJob('test', { 'runs-on': 'ubuntu-latest' })
const buildJob = new NormalJob('build', { 'runs-on': 'ubuntu-latest' })

export const workflow = new Workflow('ci', {
  name: 'CI',
  on: { push: {} },
}).addJobs([testJob, buildJob])
```

### .addEnvs()

Add environment variables to the workflow (available to all jobs).

```typescript
export const workflow = new Workflow('ci', {
  name: 'CI',
  on: { push: {} },
}).addEnvs({
  NODE_ENV: 'test',
  CI: 'true',
})
```

## Properties

### .workflow

Access the raw workflow object for direct manipulation or inspection.

```typescript
const workflow = new Workflow('ci', {
  name: 'CI',
  on: { push: {} },
})

console.log(workflow.workflow)
// { name: 'CI', on: { push: {} }, jobs: {} }
```

### .outputPath

The custom output directory for this workflow, if set via the constructor options.

```typescript
const workflow = new Workflow(
  'deploy',
  { name: 'Deploy', on: { push: {} } },
  { outputPath: 'packages/app/.github/workflows' }
)

console.log(workflow.outputPath)
// 'packages/app/.github/workflows'
```

## Workflow Triggers

The `on` property defines when the workflow runs:

```typescript
new Workflow('example', {
  name: 'Example',
  on: {
    // Push to specific branches
    push: {
      branches: ['main', 'develop'],
      paths: ['src/**', 'package.json'],
    },

    // Pull requests
    pull_request: {
      branches: ['main'],
      types: ['opened', 'synchronize'],
    },

    // Scheduled runs
    schedule: [
      { cron: '0 0 * * *' }, // Daily at midnight
    ],

    // Manual trigger
    workflow_dispatch: {
      inputs: {
        environment: {
          description: 'Deployment environment',
          required: true,
          default: 'staging',
          type: 'choice',
          options: ['staging', 'production'],
        },
      },
    },

    // Called by other workflows
    workflow_call: {
      inputs: {
        version: {
          required: true,
          type: 'string',
        },
      },
      secrets: {
        token: {
          required: true,
        },
      },
    },
  },
})
```

## Complete Example

```typescript
import { Workflow, NormalJob, Step, expressions as ex } from '@github-actions-workflow-ts/lib'

const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})

const setupNode = new Step({
  name: 'Setup Node.js',
  uses: 'actions/setup-node@v4',
  with: { 'node-version': '20' },
})

const install = new Step({
  name: 'Install dependencies',
  run: 'npm ci',
})

const testJob = new NormalJob('test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 10,
}).addSteps([checkout, setupNode, install, new Step({ name: 'Test', run: 'npm test' })])

const buildJob = new NormalJob('build', {
  'runs-on': 'ubuntu-latest',
}).addSteps([checkout, setupNode, install, new Step({ name: 'Build', run: 'npm run build' })])

buildJob.needs([testJob])

export const ci = new Workflow('ci', {
  name: 'CI',
  on: {
    push: { branches: ['main'] },
    pull_request: { branches: ['main'] },
  },
})
  .addEnvs({ CI: 'true' })
  .addJobs([testJob, buildJob])
```
