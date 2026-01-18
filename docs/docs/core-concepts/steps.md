---
sidebar_position: 3
---

# Steps

Steps are the individual tasks within a job. Each step runs in its own process.

## Constructor

```typescript
new Step(step: StepDefinition)
```

```typescript
import { Step } from '@github-actions-workflow-ts/lib'

// Action step
const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})

// Run step
const test = new Step({
  name: 'Run tests',
  run: 'npm test',
})
```

## Step Properties

```typescript
const step = new Step({
  // Display name
  name: 'Build application',

  // Step identifier (for outputs)
  id: 'build',

  // Conditional execution
  if: "github.event_name == 'push'",

  // Use an action
  uses: 'actions/setup-node@v4',

  // Action inputs
  with: {
    'node-version': '20',
  },

  // OR run a command
  run: 'npm run build',

  // Shell to use (bash, pwsh, python, etc.)
  shell: 'bash',

  // Working directory
  'working-directory': './app',

  // Environment variables
  env: {
    NODE_ENV: 'production',
  },

  // Continue on error
  'continue-on-error': true,

  // Timeout in minutes
  'timeout-minutes': 10,
})
```

## Methods

### .addEnvs()

Add environment variables to a step.

```typescript
const deployStep = new Step({
  name: 'Deploy',
  run: 'npm run deploy',
}).addEnvs({
  AWS_ACCESS_KEY_ID: '${{ secrets.AWS_ACCESS_KEY_ID }}',
  AWS_SECRET_ACCESS_KEY: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
})
```

## Multiline Commands

### Using multilineString()

```typescript
import { Step, multilineString } from '@github-actions-workflow-ts/lib'

const step = new Step({
  name: 'Build and test',
  run: multilineString(
    'echo "Building..."',
    'npm run build',
    'echo "Testing..."',
    'npm test'
  ),
})
```

Generates:

```yaml
- name: Build and test
  run: |-
    echo "Building..."
    npm run build
    echo "Testing..."
    npm test
```

### Using dedentString()

For more readable indented code:

```typescript
import { Step, dedentString } from '@github-actions-workflow-ts/lib'

const step = new Step({
  name: 'Deploy script',
  run: dedentString(`
    #!/bin/bash
    echo "Starting deployment..."
    if [ -d "./dist" ]; then
      rsync -avz ./dist/ server:/var/www/
      echo "Deployment complete!"
    else
      echo "No dist directory found"
      exit 1
    fi
  `),
})
```

## Step Outputs

Access outputs from a step in subsequent steps:

```typescript
import { Step, expressions as ex } from '@github-actions-workflow-ts/lib'

const getVersion = new Step({
  id: 'version',
  name: 'Get version',
  run: 'echo "value=$(cat package.json | jq -r .version)" >> $GITHUB_OUTPUT',
})

const useVersion = new Step({
  name: 'Use version',
  run: `echo "Version is ${ex.expn('steps.version.outputs.value')}"`,
})
```

## Typed Action Steps

For better type safety, use the `@github-actions-workflow-ts/actions` package:

```typescript
import { ActionsSetupNodeV4 } from '@github-actions-workflow-ts/actions'

const setupNode = new ActionsSetupNodeV4({
  id: 'setup-node',
  name: 'Setup Node.js',
  with: {
    'node-version': '20.x',
    cache: 'pnpm', // TypeScript validates this
  },
})

// Access typed outputs
console.log(setupNode.outputs['node-version'])
// '${{ steps.setup-node.outputs.node-version }}'
```

See [Typed Actions](/docs/guides/typed-actions) for more details.

## Common Patterns

### Checkout and Setup

```typescript
const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
  with: {
    'fetch-depth': 0, // Full history for tags
  },
})

const setupNode = new Step({
  name: 'Setup Node.js',
  uses: 'actions/setup-node@v4',
  with: {
    'node-version': '20',
    cache: 'npm',
  },
})
```

### Conditional Steps

```typescript
const deployProd = new Step({
  name: 'Deploy to production',
  if: "github.ref == 'refs/heads/main'",
  run: 'npm run deploy:prod',
})

const deployStaging = new Step({
  name: 'Deploy to staging',
  if: "github.ref != 'refs/heads/main'",
  run: 'npm run deploy:staging',
})
```

### Caching

```typescript
const cache = new Step({
  name: 'Cache dependencies',
  uses: 'actions/cache@v4',
  with: {
    path: '~/.npm',
    key: "npm-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}",
    'restore-keys': 'npm-${{ runner.os }}-',
  },
})
```

### Upload Artifacts

```typescript
const uploadArtifact = new Step({
  name: 'Upload build artifacts',
  uses: 'actions/upload-artifact@v4',
  with: {
    name: 'dist',
    path: 'dist/',
    'retention-days': 7,
  },
})
```
