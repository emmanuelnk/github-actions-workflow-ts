---
sidebar_position: 4
---

# Helpers

Utility functions to make writing workflows easier.

## expressions

Helper functions for creating GitHub Actions expressions.

### .expn()

Create an expression string `${{ <expression> }}`.

```typescript
import { expressions } from '@github-actions-workflow-ts/lib'

expressions.expn('hashFiles("**/pnpm-lock.yaml")')
// '${{ hashFiles("**/pnpm-lock.yaml") }}'

expressions.expn('github.event.pull_request.number')
// '${{ github.event.pull_request.number }}'

expressions.expn('matrix.node')
// '${{ matrix.node }}'
```

### .env()

Create an environment variable expression `${{ env.VAR }}`.

```typescript
import { expressions } from '@github-actions-workflow-ts/lib'

expressions.env('GITHUB_SHA')
// '${{ env.GITHUB_SHA }}'

expressions.env('NODE_VERSION')
// '${{ env.NODE_VERSION }}'
```

### .secret()

Create a secret expression `${{ secrets.NAME }}`.

```typescript
import { expressions } from '@github-actions-workflow-ts/lib'

expressions.secret('GITHUB_TOKEN')
// '${{ secrets.GITHUB_TOKEN }}'

expressions.secret('NPM_TOKEN')
// '${{ secrets.NPM_TOKEN }}'
```

### .var()

Create a variable expression `${{ vars.NAME }}`.

```typescript
import { expressions } from '@github-actions-workflow-ts/lib'

expressions.var('SENTRY_APP_ID')
// '${{ vars.SENTRY_APP_ID }}'

expressions.var('ENVIRONMENT')
// '${{ vars.ENVIRONMENT }}'
```

### .ternary()

Create a ternary expression.

```typescript
import { expressions } from '@github-actions-workflow-ts/lib'

expressions.ternary("github.event_name == 'release'", 'prod', 'dev')
// "${{ github.event_name == 'release' && 'prod' || 'dev' }}"

expressions.ternary('github.event.pull_request', 'PR build', 'Push build')
// "${{ github.event.pull_request && 'PR build' || 'Push build' }}"
```

## multilineString()

Join strings with newlines for multiline YAML.

```typescript
import { multilineString } from '@github-actions-workflow-ts/lib'

multilineString('echo "Line 1"', 'echo "Line 2"', 'echo "Line 3"')
// 'echo "Line 1"\necho "Line 2"\necho "Line 3"'
```

Use in a step:

```typescript
import { Step, multilineString } from '@github-actions-workflow-ts/lib'

const step = new Step({
  name: 'Run script',
  run: multilineString(
    '#!/bin/bash',
    'ls /tmp',
    'if [ ! -d "/tmp/build" ]; then',
    '  mv /tmp/build .',
    '  ls',
    'fi'
  ),
})
```

Generates:

```yaml
- name: Run script
  run: |-
    #!/bin/bash
    ls /tmp
    if [ ! -d "/tmp/build" ]; then
      mv /tmp/build .
      ls
    fi
```

## dedentString()

Remove leading indentation from template literals.

```typescript
import { dedentString } from '@github-actions-workflow-ts/lib'

const script = dedentString(`
  echo "Starting deployment..."
  if [ -d "./dist" ]; then
    rsync -avz ./dist/ user@server:/var/www/
    echo "Deployment complete!"
  else
    echo "No dist directory found"
    exit 1
  fi
`)
```

This removes the leading whitespace, generating clean YAML:

```yaml
- name: Deploy
  run: |-
    echo "Starting deployment..."
    if [ -d "./dist" ]; then
      rsync -avz ./dist/ user@server:/var/www/
      echo "Deployment complete!"
    else
      echo "No dist directory found"
      exit 1
    fi
```

## echoKeyValue

Helpers for writing key-value pairs to files and GitHub outputs.

### .to()

Write a key-value pair to any file.

```typescript
import { echoKeyValue } from '@github-actions-workflow-ts/lib'

echoKeyValue.to('@your-org:registry', 'https://npm.pkg.github.com', '.npmrc')
// 'echo "@your-org:registry=https://npm.pkg.github.com" >> .npmrc'
```

### .toGithubEnv()

Write to `$GITHUB_ENV` (set environment variables for subsequent steps).

```typescript
import { echoKeyValue } from '@github-actions-workflow-ts/lib'

echoKeyValue.toGithubEnv('NODE_VERSION', '20')
// 'echo "NODE_VERSION=20" >> $GITHUB_ENV'
```

### .toGithubOutput()

Write to `$GITHUB_OUTPUT` (set step outputs).

```typescript
import { echoKeyValue } from '@github-actions-workflow-ts/lib'

echoKeyValue.toGithubOutput('version', '1.0.0')
// 'echo "version=1.0.0" >> $GITHUB_OUTPUT'
```

## Complete Example

```typescript
import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
  multilineString,
  echoKeyValue,
} from '@github-actions-workflow-ts/lib'

const getVersionStep = new Step({
  id: 'version',
  name: 'Get version',
  run: multilineString(
    'VERSION=$(cat package.json | jq -r .version)',
    echoKeyValue.toGithubOutput('value', '$VERSION')
  ),
})

const buildStep = new Step({
  name: 'Build',
  run: 'npm run build',
  env: {
    VERSION: ex.expn('steps.version.outputs.value'),
    NODE_ENV: ex.ternary("github.ref == 'refs/heads/main'", 'production', 'development'),
  },
})

const deployStep = new Step({
  name: 'Deploy',
  if: "github.ref == 'refs/heads/main'",
  run: 'npm run deploy',
  env: {
    AWS_ACCESS_KEY_ID: ex.secret('AWS_ACCESS_KEY_ID'),
    AWS_SECRET_ACCESS_KEY: ex.secret('AWS_SECRET_ACCESS_KEY'),
  },
})

const buildJob = new NormalJob('build', { 'runs-on': 'ubuntu-latest' })
  .addSteps([getVersionStep, buildStep, deployStep])

export const workflow = new Workflow('deploy', {
  name: 'Deploy',
  on: { push: { branches: ['main'] } },
}).addJob(buildJob)
```
