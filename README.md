# github-actions-workflow-ts
Stop writing workflows in YAML and use Typescript instead!

<p align="center"><img src="https://github.com/emmanuelnk/github-actions-workflow-ts/assets/19330930/9121bb33-cd51-41f3-830f-9b4bd1117320" alt="github-actions-workflow-ts-logo" width="400"/></p>


[![](https://img.shields.io/npm/v/github-actions-workflow-ts.svg)](https://www.npmjs.com/package/github-actions-workflow-ts)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/webiny/webiny-js/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Tests](https://github.com/emmanuelnk/github-actions-workflow-ts/actions/workflows/test.yml/badge.svg)](https://github.com/emmanuelnk/github-actions-workflow-ts/actions/workflows/test.yml)
[![cov](https://emmanuelnk.github.io/github-actions-workflow-ts/badges/coverage.svg)](https://github.com/<you>/<repo>/actions)

## Table of Contents
- [github-actions-workflow-ts](#github-actions-workflow-ts)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Overview](#overview)
  - [Example](#example)
  - [Generating Workflow YAML](#generating-workflow-yaml)
    - [Using the CLI](#using-the-cli)
    - [Usage With Husky (Recommended)](#usage-with-husky-recommended)
  - [Helpers](#helpers)
    - [`multilineString()`](#multilinestring)
      - [Example 1](#example-1)
      - [Example 2 - handling multiline indentation](#example-2---handling-multiline-indentation)
    - [`expressions`](#expressions)
      - [`.expn()`](#expn)
      - [`.env()`](#env)
      - [`.secret()`](#secret)
      - [`.var()`](#var)
    - [`echoKeyValue`](#echokeyvalue)
      - [`.to()`](#to)
      - [`.toGithubEnv()`](#togithubenv)
      - [`.toGithubOutput()`](#togithuboutput)
    - [`workflowOps`](#workflowops)
      - [`.ternary()`](#ternary)
  - [Contributing](#contributing)
  - [Credits](#credits)
    - [Why then not just use `webiny/github-actions-wac` package?](#why-then-not-just-use-webinygithub-actions-wac-package)

## Installation

```
npm install --save-dev github-actions-workflow-ts
```

## Overview

The `github-actions-workflow-ts` package allows you to write GitHub Actions workflows using Typescript (that are then compiled to YAML files that you don't have to manage!). This allows you to easily re-use, modularize and share workflow Typescript code -- something that is not easy with YAML.

To get started, simply create a new `*.wac.ts` e.g. `deploy.wac.ts` anywhere in your project and start writing your GitHub Actions workflow.

## Example
Check the [examples folder](./examples/) and the [workflows folder](./workflows/) for more advanced examples.

Below is a simple example:
  ```ts
  // example.wac.ts

  import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts'

  const checkoutStep = new Step({
    name: 'Checkout',
    uses: 'actions/checkout@v3',
  })

  const testJob = new NormalJob('Test', {
    'runs-on': 'ubuntu-latest',
    'timeout-minutes': 2
  })

  // the filename of the workflow to be generated is the 
  // first argument of the Workflow class constructor
  // i.e. example-filename.yml
  // IMPORTANT: the instance of Workflow MUST be exported with `export`
  export const exampleWorkflow = new Workflow('example-filename', {
    name: Example,
    on: {
      workflow_dispatch: {}
    }
  })

  // add the defined step to the defined job
  testJob.addStep(checkoutStep)

  // add the defined job to the defined workflow
  exampleWorkflow.addJob(testJob)
  ```

## Generating Workflow YAML
### Using the CLI
- When you have written your `*.wac.ts` file, you use the `github-actions-workflow-ts` CLI to generate the yaml files. 
- **DON'T FORGET** to **export** the Workflows you want to generate in your `.wac.ts` files i.e. 
  ```ts
    // generates example-filename.yml
    export const exampleWorkflow = new Workflow('example-filename', {  
      // ...
    })
  ```
- To generate:
  ```bash
  npx generate-workflow-files build
  ```
- Or using the shorthand command
  ```bash
  npx gwf build
  ```

### Usage With Husky (Recommended)
In order to automate all of the above and not think about forgetting to build the updated `*.wac.ts` file, one should use husky:
- Install Husky:
  ```bash
  npm install --save-dev husky
  npx husky-init
  ```
- In `package.json`, add the following scripts:
  ```json
    "scripts": {
      "build:wac": "npx gwf build && git add .github/workflows/*.yml",
    }
  ```
- Install the `pre-commit` command to Husky and add our npm command to build the `*.wac.ts` files
  ```bash
  npx husky add .husky/pre-commit "npm run build:wac"
  ```
- Now every time you make a change to `*.wac.ts`, Husky will run the `npx gwf build` command and add the generated `.github/workflows/*.yml` to your commit

## Helpers
### `multilineString()`
This is a useful function that aids in writing multiline yaml like this:
  ```yaml
    name: Run something
    run: |-
      command exec line 1
      command exec line 2
  ```
#### Example 1
```ts
import { multilineString } from 'github-actions-workflow-ts'

// multilineString(...strings) joins all strings with a newline character '\n' which is interpreted as separate lines in YAML
console.log(multilineString('This is sentence 1', 'This is sentence 2'))
// 'This is sentence 1\nThis is sentence 2'

// it also has the ability to escape special characters
console.log(
  multilineString(
    `content="\${content//$'\n'/'%0A'}"`,
    `content="\${content//$'\r'/'%0D'}"`
  )
)
// `content="${content//$'\n'/'%0A'}"`
// `content="${content//$'\r'/'%0D'}"``
```
#### Example 2 - handling multiline indentation
```yaml
      - name: Check for build directory
        run: |-
          #!/bin/bash
          ls /tmp
          if [ ! -d "/tmp/build" ]; then
            mv /tmp/build .
            ls
          fi
```
Then you just add the same indentation in the string:
```ts
  // If you want indentation then you can do this:
  new Step({
    name: 'Check for build directory',
    run: multilineString(
      `#!/bin/bash`,
      `ls /tmp`,
      `if [ ! -d "/tmp/build" ]; then`,
      `  mv /tmp/build .`, // notice the two spaces before 'mv ..'
      `  ls`,              // notice the two spaces before 'ls ..'
      `fi`,
    ),
  });
```

### `expressions`
#### `.expn()`
Returns the expression string `${{ <expression> }}`
  ```ts
  import { expressions } from 'github-actions-workflow-ts'

  console.log(expressions.expn('hashFiles("**/pnpm-lock.yaml")'))
  // '${{ hashFiles("**/pnpm-lock.yaml") }}'
  ```
#### `.env()`
Returns the expression string `${{ env.SOMETHING }}`
  ```ts
  import { expressions } from 'github-actions-workflow-ts'

  console.log(expressions.env('GITHUB_SHA'))
  // '${{ env.GITHUB_SHA }}'
  ```
#### `.secret()`
Returns the expression string `${{ secrets.SOMETHING }}`
  ```ts
  import { expressions } from 'github-actions-workflow-ts'

  console.log(expressions.secret('GITHUB_TOKEN'))
  // '${{ secrets.GITHUB_TOKEN }}'
  ```

#### `.var()`
Returns the expression string `${{ vars.SOMETHING }}`
  ```ts
  import { expressions } from 'github-actions-workflow-ts'

  console.log(expressions.var('SENTRY_APP_ID'))
  // '${{ vars.SENTRY_APP_ID }}'
  ```

### `echoKeyValue`
#### `.to()`
Returns the string `echo "key=value" >> <SOMETHING>`
  ```ts
  import { echoKeyValue } from 'github-actions-workflow-ts'

  // echoKeyValue.to(key, value, to) returns 'echo "key=value" >> <SOMETHING>'
  echoKeyValue.to('@your-org:registry', 'https://npm.pkg.github.com', '.npmrc')
  // 'echo "@your-org:registry=https://npm.pkg.github.com" >> .npmrc'
  ```

#### `.toGithubEnv()`
Returns the string `echo "key=value" >> $GITHUB_ENV`
  ```ts
  import { echoKeyValue } from 'github-actions-workflow-ts'

  // echoKeyValue.toGithubEnv(key, value, to) returns 'echo "key=value" >> $GITHUB_ENV'
  echoKeyValue.toGithubEnv('NODE_VERSION', '18')
  // 'echo "NODE_VERSION=18" >> $GITHUB_ENV'
  ```

#### `.toGithubOutput()`
Returns the string `echo "key=value" >> $GITHUB_OUTPUT`
  ```ts
  import { echoKeyValue } from 'github-actions-workflow-ts'

  // echoKeyValue.toGithubOutput(key, value, to) returns 'echo "key=value" >> $GITHUB_OUTPUT'
  echoKeyValue.toGithubOutput('NODE_VERSION', '18')
  // 'echo "NODE_VERSION=18" >> $GITHUB_OUTPUT'
  ```

### `workflowOps`
#### `.ternary()`
  ```ts
  import { workflowOps } from 'github-actions-workflow-ts'

  // ternary(condition, ifTrue, ifFalse)
  console.log(workflowOps.ternary("github.event_name == 'release'", 'prod', 'dev'))
  // '${{ github.event_name == 'release' && 'prod' || 'dev' }}'
  ```

## Contributing
See the [Contributing Guide](./.github/CONTRIBUTING.md)

## Credits
Inspired by [webiny/github-actions-wac](https://github.com/webiny/github-actions-wac) which is also the original source of the filename extension (`.wac.ts`) used to distinguish the Github Actions YAML workflow Typescript files.

### Why then not just use `webiny/github-actions-wac` package?
You definitely can! It's a great project. There are some significant differences between my package and that one. This package:
- Allows for more flexibility in naming the generated yaml workflow files e.g. use of hyphens -- `example-filename.yml`
- Allows for a more flexible project structure since it will read all `*.wac.ts` files in a project instead of just those under `.github/workflows`. This means you can create a dedicated `./workflows` folder in your `src` folder and still be sure that the generated yaml will be placed correctly in `.github/workflows/`
- Adds helper classes to abstract away the types if needed e.g. `new Step()`, `new NormalJob()` etc
- Extends certain types e.g. `Step`
- Adds utility functions to aid in the writing of common workflow syntax e.g. `${{ <expression> }}`, `echo "key"="value" >> LOCATION` and multiline yaml

