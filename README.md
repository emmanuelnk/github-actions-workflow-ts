# github-actions-workflow-ts
Stop writing workflows in YAML and use Typescript instead!

<p align="center"><img src="https://github.com/emmanuelnk/github-actions-workflow-ts/assets/19330930/9121bb33-cd51-41f3-830f-9b4bd1117320" alt="github-actions-workflow-ts-logo" width="400"/></p>

<p align="center">

  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts">
      <img src="https://raw.githubusercontent.com/ellerbrock/open-source-badges/master/badges/open-source-v1/open-source.png" alt="love opensource">
  </a>
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  </a>
  <a href="https://www.npmjs.com/package/github-actions-workflow-ts">
      <img src="https://img.shields.io/npm/v/github-actions-workflow-ts.svg" alt="npm version">
  </a>
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/actions/workflows/test.yml">
      <img src="https://github.com/emmanuelnk/github-actions-workflow-ts/actions/workflows/test.yml/badge.svg" alt="Tests">
  </a>
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/actions">
      <img src="https://emmanuelnk.github.io/github-actions-workflow-ts/badges/coverage.svg" alt="coverage">
  </a>
  <a href="https://github.com/emmanuelnk/github-actions-workflow-ts/issues">
      <img src="https://img.shields.io/github/issues/emmanuelnk/github-actions-workflow-ts.svg" alt="issues">
  </a>
</p>

## Table of Contents
- [github-actions-workflow-ts](#github-actions-workflow-ts)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Overview](#overview)
  - [Try it out on Replit](#try-it-out-on-replit)
  - [Simple Example](#simple-example)
  - [Generating Workflow YAML](#generating-workflow-yaml)
    - [Using the CLI](#using-the-cli)
    - [Usage with Husky (Suggested Recommendation)](#usage-with-husky-suggested-recommendation)
  - [Workflow Classes](#workflow-classes)
    - [`new Step()`](#new-step)
    - [`new NormalJob()`](#new-normaljob)
      - [`.addStep()`](#addstep)
      - [`.addSteps()`](#addsteps)
      - [`.needs()`](#needs)
    - [`new ReusableWorkflowCallJob()`](#new-reusableworkflowcalljob)
    - [`new Workflow()`](#new-workflow)
      - [`.addJob()`](#addjob)
      - [`.addJobs()`](#addjobs)
  - [Workflow Types](#workflow-types)
    - [GeneratedWorkflowTypes](#generatedworkflowtypes)
    - [ExtendedWorkflowTypes](#extendedworkflowtypes)
  - [Helpers](#helpers)
    - [`multilineString()`](#multilinestring)
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

The `github-actions-workflow-ts` package lets you write GitHub Actions workflows using Typescript. The workflows are then auto-compiled into YAML files that you don't have to manage manually -- Workflow as Code (wac)!. 

The advantage of using an imperative language like Typscript to write Workflows is that it allows you to:
- write them confidently with type safety
- package/modularize common/repetitve jobs and steps (write once, use everywhere)
- make use of control flow logic like conditionals and other imperative programming language functionality to build complex workflows that isn't really possible with YAML alone. 

To get started, simply create a new `*.wac.ts` e.g. `deploy.wac.ts` anywhere in your project and start writing your GitHub Actions workflow.

## Try it out on Replit
Want to quickly see it in action? Explore these Replit examples (create a free account to fork and modify my examples):
- [Simple Example](https://replit.com/@EmmanuelKyeyune/github-actions-workflow-ts-example#workflows/simple.example.wac.ts)
- [Advanced Example](https://replit.com/@EmmanuelKyeyune/github-actions-workflow-ts-example#src/workflows/advanced.example.wac.ts)

## Simple Example
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

  // IMPORTANT - the instance of Workflow MUST be exported with `export`
  export const exampleWorkflow = new Workflow('example-filename', {
    name: 'Example',
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
- To generate the yaml files, run the following commands from your root directory:
  ```bash
  npx generate-workflow-files build
  ```
- Or (short-hand):
  ```bash
  npx gwf build
  ```

### Usage with Husky (Suggested Recommendation)
<details><summary>See more</summary>

In order to automate all of the above and not think about forgetting to build the updated `*.wac.ts` file, one should use husky:
- Install Husky:
  ```bash
  npm install --save-dev husky
  npx husky-init
  ```
- In `package.json`, add the following script:
  ```json
    "scripts": {
      "build:workflows": "npx gwf build && git add .github/workflows/*.yml",
    }
  ```
- Install the `pre-commit` command to Husky and add our npm command to build the `*.wac.ts` files
  ```bash
  npx husky add .husky/pre-commit "npm run build:workflows"
  ```
- Now every time you make a change to `*.wac.ts`, Husky will run the `npx gwf build` command and add the generated `.github/workflows/*.yml` to your commit
</details>

## Workflow Classes
### `new Step()`
The building block of every `NormalJob`. Contains instructions on what to run in your Github Actions Runner in each job.
<details><summary>Example</summary>

```ts
import { Step } from 'github-actions-workflow-ts'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})
```
</details>

### `new NormalJob()`
The most typical job that contains steps.

#### `.addStep()`
This adds a single step to a normal Job

<details><summary>Example</summary>

```ts
import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})

const testJob = new NormalJob('Test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
})

testJob.addStep(checkoutStep)
```
</details>

#### `.addSteps()`
This adds multiple steps to a normal Job

<details><summary>Example</summary>

```ts
import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})

const installNodeStep = new Step({
  name: 'Install Node',
  uses: 'actions/setup-node@v3',
  with: {
    'node-version': 18
  }
})

const testJob = new NormalJob('Test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
})

testJob.addSteps([
  checkoutStep,
  installNodeStep
])
```
</details>

#### `.needs()`
This adds any jobs that the current job depends on to the current job's `needs` property

<details><summary>Example</summary>

```ts
import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})

const testJob = new NormalJob('Test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
})

const buildJob = new NormalJob('Build', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
})


testJob.addStep(checkoutStep)
buildJob
  .needs([testJob])
  .addStep(checkoutStep)

export const exampleWorkflow = new Workflow('example-filename', {
  name: 'Example',
  on: {
    workflow_dispatch: {}
  }
})

exampleWorkflow.addJobs([
  testJob,
  buildJob
])  
```
</details>

### `new ReusableWorkflowCallJob()`
A job that allows you to call another workflow and use it in the same run.

<details><summary>Example</summary>

```ts
import { Workflow, ReusableWorkflowCallJob } from 'github-actions-workflow-ts'

const releaseJob = new ReusableWorkflowCallJob('ReleaseJob', {
	uses: 'your-org/your-repo/.github/workflows/reusable-workflow.yml@main',
	secrets: 'inherit',
})

export const exampleWorkflow = new Workflow('example-filename', {
  name: 'Example',
  on: {
    workflow_dispatch: {}
  }
}).addJob(releaseJob)  
```
</details>

### `new Workflow()`
#### `.addJob()`
This adds a single job to a Workflow

<details><summary>Example</summary>

```ts
import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})

const testJob = new NormalJob('Test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
})

testJob.addStep([checkoutStep])

export const exampleWorkflow = new Workflow('example-filename', {
  name: 'Example',
  on: {
    workflow_dispatch: {}
  }
})

exampleWorkflow.addJob(testJob)  
```
</details>

#### `.addJobs()`
This adds multiple jobs to a Workflow

<details><summary>Example</summary>

```ts
import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})

const testJob = new NormalJob('Test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
})

const buildJob = new NormalJob('Build', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
})


testJob.addStep(checkoutStep)
buildJob.addStep(checkoutStep)

export const exampleWorkflow = new Workflow('example-filename', {
  name: 'Example',
  on: {
    workflow_dispatch: {}
  }
})

exampleWorkflow.addJobs([
  testJob,
  buildJob
])  
```
</details>

## Workflow Types
You can also choose not to use the workflow helpers and just use plain old JSON. You get type safety by importing the types. The only exception is the `Workflow` class. You must export an instance of this class in order to generate your workflow files.

### GeneratedWorkflowTypes
These are types generated right out of the [Github Actions Workflow JSON Schema](https://json.schemastore.org/github-workflow.json)

### ExtendedWorkflowTypes
These are types that I extended myself because they weren't autogenerated from the JSON Schema.

<details><summary>Example</summary>

```ts
import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
  ExtendedWorkflowTypes as EWT, // contains the Step and Steps types
  GeneratedWorkflowTypes as GWT, // contains all the other types e.g. NormalJob, ReusableWorkflowCallJob etc
} from '../src'

const nodeSetupStep: EWT.Step = {
  name: 'Setup Node',
  uses: 'actions/setup-node@v3',
  with: {
    'node-version': '18.x',
  },
}

const firstNormalJob: GWT.NormalJob = {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 5,
  steps: [
    nodeSetupStep,
    {
      name: 'Echo',
      run: 'echo "Hello, World!"',
    },
  ],
}

export const simpleWorkflowOne = new Workflow('simple-1', {
  name: 'ExampleSimpleWorkflow',
  on: {
    workflow_dispatch: {},
  },
  jobs: {
    firstJob: firstNormalJob,
  },
})
```
</details>

## Helpers
### `multilineString()`
This is a useful function that aids in writing multiline yaml like this:
  ```yaml
    name: Run something
    run: |-
      command exec line 1
      command exec line 2
  ```

<details><summary>Examples</summary>

Example 1
```ts
import { multilineString } from 'github-actions-workflow-ts'

// multilineString(...strings) joins all strings with a newline 
// character '\n' which is interpreted as separate lines in YAML
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
Example 2 - handling multiline string indentation
If you want to do something like this
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
then you just add the same indentation in the string:
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
</details>

### `expressions`
#### `.expn()`
Returns the expression string `${{ <expression> }}`
<details><summary>Example</summary>

  ```ts
  import { expressions } from 'github-actions-workflow-ts'

  console.log(expressions.expn('hashFiles("**/pnpm-lock.yaml")'))
  // '${{ hashFiles("**/pnpm-lock.yaml") }}'
  ```
</details>

#### `.env()`
Returns the expression string `${{ env.SOMETHING }}`
<details><summary>Example</summary>

  ```ts
  import { expressions } from 'github-actions-workflow-ts'

  console.log(expressions.env('GITHUB_SHA'))
  // '${{ env.GITHUB_SHA }}'
  ```
</details>

#### `.secret()`
Returns the expression string `${{ secrets.SOMETHING }}`
<details><summary>Example</summary>

  ```ts
  import { expressions } from 'github-actions-workflow-ts'

  console.log(expressions.secret('GITHUB_TOKEN'))
  // '${{ secrets.GITHUB_TOKEN }}'
  ```
</details>

#### `.var()`
Returns the expression string `${{ vars.SOMETHING }}`
<details><summary>Example</summary>

  ```ts
  import { expressions } from 'github-actions-workflow-ts'

  console.log(expressions.var('SENTRY_APP_ID'))
  // '${{ vars.SENTRY_APP_ID }}'
  ```
</details>

### `echoKeyValue`
#### `.to()`
Returns the string `echo "key=value" >> <SOMETHING>`
<details><summary>Example</summary>

  ```ts
  import { echoKeyValue } from 'github-actions-workflow-ts'

  // echoKeyValue.to(key, value, to) returns 'echo "key=value" >> <SOMETHING>'
  echoKeyValue.to('@your-org:registry', 'https://npm.pkg.github.com', '.npmrc')
  // 'echo "@your-org:registry=https://npm.pkg.github.com" >> .npmrc'
  ```
</details>

#### `.toGithubEnv()`
Returns the string `echo "key=value" >> $GITHUB_ENV`
<details><summary>Example</summary>

  ```ts
  import { echoKeyValue } from 'github-actions-workflow-ts'

  // echoKeyValue.toGithubEnv(key, value, to) returns 'echo "key=value" >> $GITHUB_ENV'
  echoKeyValue.toGithubEnv('NODE_VERSION', '18')
  // 'echo "NODE_VERSION=18" >> $GITHUB_ENV'
  ```
</details>

#### `.toGithubOutput()`
Returns the string `echo "key=value" >> $GITHUB_OUTPUT`
<details><summary>Example</summary>

  ```ts
  import { echoKeyValue } from 'github-actions-workflow-ts'

  // echoKeyValue.toGithubOutput(key, value, to) returns 'echo "key=value" >> $GITHUB_OUTPUT'
  echoKeyValue.toGithubOutput('NODE_VERSION', '18')
  // 'echo "NODE_VERSION=18" >> $GITHUB_OUTPUT'
  ```
</details>

### `workflowOps`
#### `.ternary()`
<details><summary>Example</summary>

  ```ts
  import { workflowOps } from 'github-actions-workflow-ts'

  // ternary(condition, ifTrue, ifFalse)
  console.log(workflowOps.ternary("github.event_name == 'release'", 'prod', 'dev'))
  // '${{ github.event_name == 'release' && 'prod' || 'dev' }}'
  ```
</details>

## Contributing
See the [Contributing Guide](./.github/CONTRIBUTING.md)

## Credits
Inspired by [webiny/github-actions-wac](https://github.com/webiny/github-actions-wac) which is also the original source of the filename extension (`.wac.ts`) used to distinguish the Github Actions YAML workflow Typescript files.

### Why then not just use `webiny/github-actions-wac` package?
<details><summary>See more</summary>

You definitely can! It's a great project. There are some significant differences between my package and that one. This package:
- Allows for more flexibility in naming the generated yaml workflow files e.g. use of hyphens -- `example-filename.yml`
- Allows for a more flexible project structure since it will read all `*.wac.ts` files in a project instead of just those under `.github/workflows`. This means you can create a dedicated `./workflows` folder in your `src` folder and still be sure that the generated yaml will be placed correctly in `.github/workflows/`
- Adds helper classes to abstract away the types if needed e.g. `new Step()`, `new NormalJob()` etc
- Extends certain types e.g. `Step`
- Adds utility functions to aid in the writing of common workflow syntax e.g. `${{ <expression> }}`, `echo "key"="value" >> LOCATION` and multiline yaml
</details>
