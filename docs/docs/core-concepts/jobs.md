---
sidebar_position: 2
---

# Jobs

Jobs are the main building blocks of a workflow. They run on a runner and contain steps.

## NormalJob

The most common job type, containing steps that run sequentially.

### Constructor

```typescript
new NormalJob(name: string, job: JobDefinition)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | The job identifier (used in YAML and for `needs` references) |
| `job` | `object` | The job definition |

```typescript
import { NormalJob } from '@github-actions-workflow-ts/lib'

const testJob = new NormalJob('test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 10,
})
```

### Methods

#### .addStep()

Add a single step to the job.

```typescript
const job = new NormalJob('test', { 'runs-on': 'ubuntu-latest' })
  .addStep(new Step({ name: 'Checkout', uses: 'actions/checkout@v4' }))
  .addStep(new Step({ name: 'Test', run: 'npm test' }))
```

#### .addSteps()

Add multiple steps at once.

```typescript
const job = new NormalJob('test', { 'runs-on': 'ubuntu-latest' })
  .addSteps([
    new Step({ name: 'Checkout', uses: 'actions/checkout@v4' }),
    new Step({ name: 'Setup', uses: 'actions/setup-node@v4' }),
    new Step({ name: 'Test', run: 'npm test' }),
  ])
```

#### .addEnvs()

Add environment variables to the job (available to all steps).

```typescript
const job = new NormalJob('test', { 'runs-on': 'ubuntu-latest' })
  .addEnvs({
    NODE_ENV: 'test',
    DEBUG: 'true',
  })
```

#### .needs()

Specify job dependencies. The current job will wait for the specified jobs to complete.

```typescript
const testJob = new NormalJob('test', { 'runs-on': 'ubuntu-latest' })
const buildJob = new NormalJob('build', { 'runs-on': 'ubuntu-latest' })
const deployJob = new NormalJob('deploy', { 'runs-on': 'ubuntu-latest' })

// deployJob runs after both testJob and buildJob complete
deployJob.needs([testJob, buildJob])
```

### Job Properties

```typescript
const job = new NormalJob('build', {
  // Required: Runner to use
  'runs-on': 'ubuntu-latest',

  // Timeout (default: 360 minutes)
  'timeout-minutes': 30,

  // Conditional execution
  if: "github.event_name == 'push'",

  // Strategy for matrix builds
  strategy: {
    matrix: {
      node: [18, 20, 22],
      os: ['ubuntu-latest', 'windows-latest'],
    },
    'fail-fast': false,
  },

  // Permissions
  permissions: {
    contents: 'read',
    packages: 'write',
  },

  // Concurrency control
  concurrency: {
    group: 'build-${{ github.ref }}',
    'cancel-in-progress': true,
  },

  // Container to run in
  container: {
    image: 'node:20',
    env: { NODE_ENV: 'test' },
  },

  // Services (e.g., databases)
  services: {
    postgres: {
      image: 'postgres:15',
      env: {
        POSTGRES_PASSWORD: 'postgres',
      },
      ports: ['5432:5432'],
    },
  },
})
```

## ReusableWorkflowCallJob

Call another workflow and use it in the same run.

```typescript
import { Workflow, ReusableWorkflowCallJob } from '@github-actions-workflow-ts/lib'

const releaseJob = new ReusableWorkflowCallJob('release', {
  uses: 'your-org/your-repo/.github/workflows/reusable-workflow.yml@main',
  with: {
    environment: 'production',
  },
  secrets: 'inherit', // or specify individual secrets
})

export const workflow = new Workflow('deploy', {
  name: 'Deploy',
  on: { workflow_dispatch: {} },
}).addJob(releaseJob)
```

### With Specific Secrets

```typescript
const releaseJob = new ReusableWorkflowCallJob('release', {
  uses: 'your-org/your-repo/.github/workflows/release.yml@main',
  with: {
    version: '1.0.0',
  },
  secrets: {
    NPM_TOKEN: '${{ secrets.NPM_TOKEN }}',
    DEPLOY_KEY: '${{ secrets.DEPLOY_KEY }}',
  },
})
```

## Matrix Builds

Use matrix strategy to run a job with different configurations:

```typescript
import { NormalJob, Step, expressions as ex } from '@github-actions-workflow-ts/lib'

const testJob = new NormalJob('test', {
  'runs-on': ex.expn('matrix.os'),
  strategy: {
    matrix: {
      os: ['ubuntu-latest', 'macos-latest', 'windows-latest'],
      node: [18, 20, 22],
    },
    'fail-fast': false,
  },
}).addSteps([
  new Step({ uses: 'actions/checkout@v4' }),
  new Step({
    uses: 'actions/setup-node@v4',
    with: { 'node-version': ex.expn('matrix.node') },
  }),
  new Step({ run: 'npm test' }),
])
```

## Job Outputs

Define and use outputs between jobs:

```typescript
const buildJob = new NormalJob('build', {
  'runs-on': 'ubuntu-latest',
  outputs: {
    version: '${{ steps.version.outputs.value }}',
  },
}).addSteps([
  new Step({
    id: 'version',
    run: 'echo "value=$(cat package.json | jq -r .version)" >> $GITHUB_OUTPUT',
  }),
])

const deployJob = new NormalJob('deploy', {
  'runs-on': 'ubuntu-latest',
  if: "needs.build.outputs.version != ''",
}).addStep(
  new Step({
    run: 'echo "Deploying version ${{ needs.build.outputs.version }}"',
  })
)

deployJob.needs([buildJob])
```
