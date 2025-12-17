# github-actions-workflow-ts
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
    - [Full Installation (recommended)](#full-installation-recommended)
    - [Library Only](#library-only)
  - [Migration from v1](#migration-from-v1)
  - [Overview](#overview)
    - [Getting Started:](#getting-started)
  - [Examples](#examples)
    - [Try it out on CodeSandbox](#try-it-out-on-codesandbox)
    - [More Examples](#more-examples)
  - [Generating Workflow YAML](#generating-workflow-yaml)
    - [Using the CLI](#using-the-cli)
    - [Integration with Husky (recommended)](#integration-with-husky-recommended)
    - [Config file](#config-file)
  - [Workflow Classes](#workflow-classes)
    - [`new Step()`](#new-step)
      - [`.addEnvs()`](#addenvs)
    - [`new NormalJob()`](#new-normaljob)
      - [`.addEnvs()`](#addenvs-1)
      - [`.addStep()`](#addstep)
      - [`.addSteps()`](#addsteps)
      - [`.needs()`](#needs)
    - [`new ReusableWorkflowCallJob()`](#new-reusableworkflowcalljob)
      - [`.needs()`](#needs-1)
    - [`new Workflow()`](#new-workflow)
      - [`.addEnvs()`](#addenvs-2)
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
      - [`.ternary()`](#ternary)
    - [`echoKeyValue`](#echokeyvalue)
      - [`.to()`](#to)
      - [`.toGithubEnv()`](#togithubenv)
      - [`.toGithubOutput()`](#togithuboutput)
  - [Contributing](#contributing)
  - [Credits](#credits)

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

<details><summary>
	
## Migration from v1

</summary>

If you're migrating from the legacy `github-actions-workflow-ts` or `github-actions-workflow-ts-lib` packages:

1. **Update your dependencies:**
   ```bash
   # Remove old packages
   npm uninstall github-actions-workflow-ts github-actions-workflow-ts-lib

   # Install new scoped packages
   npm install --save-dev @github-actions-workflow-ts/lib @github-actions-workflow-ts/cli
   ```

2. **Update your imports:**
   ```diff
   - import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts'
   + import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

   - import { Workflow, NormalJob, Step } from 'github-actions-workflow-ts-lib'
   + import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'
   ```

3. **CLI commands remain the same** - `npx gwf build` and `npx generate-workflow-files build` work as before.

</details>

## Overview
Use the flexibility of TypeScript (type safety and intellisense, modularity, control flow etc) to write GHA workflows.

### Getting Started:
To get started, create a new `*.wac.ts` e.g. `deploy.wac.ts` anywhere in your project directory.

## Examples
### Try it out on CodeSandbox
Want to quickly see it in action? Explore these CodeSandbox examples (create a free account to fork and modify my examples):
- [Simple Example](https://codesandbox.io/p/devbox/github-actions-workflow-ts-2vthc5?file=%2Fsrc%2Fworkflows%2Fsimple.example.wac.ts)
- [Advanced Example](https://codesandbox.io/p/devbox/github-actions-workflow-ts-2vthc5?file=%2Fsrc%2Fworkflows%2Fadvanced.example.wac.ts)

### More Examples
Check the [examples folder](./examples/) and the [workflows folder](./workflows/) for more advanced examples.

Below is a simple example:
  ```ts
  // example.wac.ts

  import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

  const checkoutStep = new Step({
    name: 'Checkout',
    uses: 'actions/checkout@v3',
  })

  const testJob = new NormalJob('Test', {
    'runs-on': 'ubuntu-latest',
    'timeout-minutes': 2
  })

  // 👉 IMPORTANT - every instance of Workflow (and only Workflow) MUST be exported with `export`
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

  // ----- you can also export the workflows like this -----
  //
  // export default exampleWorkflow
  //
  // ----- OR multiple workflows in the same file -----
  //
  // export {
  // 	exampleWorkflow,
  // 	exampleWorkflowTwo,
  // 	exampleWorkflowThree,
  // }
  ```
If you only installed the library (without CLI), you can use the workflow objects directly:
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

const exampleWorkflow = new Workflow('example-filename', {
  name: 'Example',
  on: {
    workflow_dispatch: {}
  }
})

// the generated workflow object to be used in other parts of your project
// without conversion to YAML
console.log(exampleWorkflow.workflow)
```

## Generating Workflow YAML
### Using the CLI
When you have written your `*.wac.ts` file, you use the `github-actions-workflow-ts` CLI to generate the yaml files. 

**Don't forget** to **export** the workflows that you want to generate in your `*.wac.ts` files i.e. 
  ```ts
    // exporting `exampleWorkflow` will generate example-filename.yml
    export const exampleWorkflow = new Workflow('example-filename', { /***/ })
  ```
Then, from project root, run:
  ```bash
  npx generate-workflow-files build

  # OR

  npx gwf build
  ```

### Integration with Husky (recommended)
For seamless automation and to eliminate the possibility of overlooking updates in `*.wac.ts` files, integrating with a pre-commit tool is recommended. We recommend [husky](https://github.com/typicode/husky). With Husky, each commit triggers the `npx github-actions-workflow-ts build` command, ensuring that your GitHub Actions YAML files consistently reflect the latest modifications.

<details><summary>See more</summary>

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

### Config file
If you want to change how github-actions-workflow-ts generates the yaml files, you can create a `wac.config.json` file in your project root. See the [example config file](./wac.config.json)

<details><summary>See config options</summary>

| Property   | Description                                                                                                                                                                                                                    | Type          | Default Value                                                                                                                                                                                                                     |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| refs       | If true, convert duplicate objects into references in YAML                                                                                                                                                                     | `Boolean`       | false                                                                                                                                                                                                                             |
| headerText | Replace the header text in generated YAML files with your own text. <br>If you want the source filename and path in the text, use `<source-file-path>` in<br>the text and it will be replaced with the path to the source-file.  | `Array<string>` | # ----DO-NOT-MODIFY-THIS-FILE----<br># This file was automatically generated by github-actions-workflow-ts. <br># Instead, modify `<source-file-path>`<br># ----DO-NOT-MODIFY-THIS-FILE---- |
| dumpOptions | Options for the dump function of js-yaml. See [all the options here](https://github.com/nodeca/js-yaml#dump-object---options-)                                                                                                 | Record <string, any> | Uses the default options                                                                                                                                                                                                  |

</details>

## Workflow Classes
### `new Step()`
The building block of every `NormalJob`. Contains instructions on what to run in your Github Actions Runner in each job.
<details><summary>Example</summary>

```ts
import { Step } from '@github-actions-workflow-ts/lib'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
})
```
</details>

#### `.addEnvs()`
This adds environment variables to a step.
<details><summary>Example</summary>

```ts
import { Step } from '@github-actions-workflow-ts/lib'

const checkoutStep = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v3',
}).addEnvs({
  SOME_KEY: 'some-value',
  SOME_OTHER_KEY: 'some-other-value'
})
```
</details>

### `new NormalJob()`
The most typical job that contains steps.

#### `.addEnvs()`
This adds environment variables to a job.
<details><summary>Example</summary>

```ts
import { NormalJob } from '@github-actions-workflow-ts/lib'

const testJob = new NormalJob('Test', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 2
}).addEnvs({
  SOME_KEY: 'some-value',
  SOME_OTHER_KEY: 'some-other-value'
})
```
</details>

#### `.addStep()`
This adds a single step to a normal Job

<details><summary>Example</summary>

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

testJob.addStep(checkoutStep)
```
</details>

#### `.addSteps()`
This adds multiple steps to a normal Job

<details><summary>Example</summary>

```ts
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

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
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

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
import { Workflow, ReusableWorkflowCallJob } from '@github-actions-workflow-ts/lib'

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

#### `.needs()`
Same as [NormalJob.needs()](#needs)

### `new Workflow()`
#### `.addEnvs()`
This adds environment variables to a workflow.
<details><summary>Example</summary>

```ts
import { Workflow } from '@github-actions-workflow-ts/lib'

export const exampleWorkflow = new Workflow('example-filename', {
  name: 'Example',
  on: {
    workflow_dispatch: {}
  }
}).addEnvs({
  SOME_KEY: 'some-value',
  SOME_OTHER_KEY: 'some-other-value'
})
```
</details>

#### `.addJob()`
This adds a single job to a Workflow

<details><summary>Example</summary>

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
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

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
  GeneratedWorkflowTypes as GWT, // all types generated from the official Github Actions Workflow JSON Schema
} from '@github-actions-workflow-ts/lib'

const nodeSetupStep: GWT.Step = {
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
import { multilineString } from '@github-actions-workflow-ts/lib'

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
  import { expressions } from '@github-actions-workflow-ts/lib'

  console.log(expressions.expn('hashFiles("**/pnpm-lock.yaml")'))
  // '${{ hashFiles("**/pnpm-lock.yaml") }}'
  ```
</details>

#### `.env()`
Returns the expression string `${{ env.SOMETHING }}`
<details><summary>Example</summary>

  ```ts
  import { expressions } from '@github-actions-workflow-ts/lib'

  console.log(expressions.env('GITHUB_SHA'))
  // '${{ env.GITHUB_SHA }}'
  ```
</details>

#### `.secret()`
Returns the expression string `${{ secrets.SOMETHING }}`
<details><summary>Example</summary>

  ```ts
  import { expressions } from '@github-actions-workflow-ts/lib'

  console.log(expressions.secret('GITHUB_TOKEN'))
  // '${{ secrets.GITHUB_TOKEN }}'
  ```
</details>

#### `.var()`
Returns the expression string `${{ vars.SOMETHING }}`
<details><summary>Example</summary>

  ```ts
  import { expressions } from '@github-actions-workflow-ts/lib'

  console.log(expressions.var('SENTRY_APP_ID'))
  // '${{ vars.SENTRY_APP_ID }}'
  ```
</details>

#### `.ternary()`
<details><summary>Example</summary>

  ```ts
  import { expressions } from '@github-actions-workflow-ts/lib'

  // ternary(condition, ifTrue, ifFalse)
  console.log(expressions.ternary("github.event_name == 'release'", 'prod', 'dev'))
  // '${{ github.event_name == 'release' && 'prod' || 'dev' }}'
  ```
</details>

### `echoKeyValue`
#### `.to()`
Returns the string `echo "key=value" >> <SOMETHING>`
<details><summary>Example</summary>

  ```ts
  import { echoKeyValue } from '@github-actions-workflow-ts/lib'

  // echoKeyValue.to(key, value, to) returns 'echo "key=value" >> <SOMETHING>'
  echoKeyValue.to('@your-org:registry', 'https://npm.pkg.github.com', '.npmrc')
  // 'echo "@your-org:registry=https://npm.pkg.github.com" >> .npmrc'
  ```
</details>

#### `.toGithubEnv()`
Returns the string `echo "key=value" >> $GITHUB_ENV`
<details><summary>Example</summary>

  ```ts
  import { echoKeyValue } from '@github-actions-workflow-ts/lib'

  // echoKeyValue.toGithubEnv(key, value, to) returns 'echo "key=value" >> $GITHUB_ENV'
  echoKeyValue.toGithubEnv('NODE_VERSION', '18')
  // 'echo "NODE_VERSION=18" >> $GITHUB_ENV'
  ```
</details>

#### `.toGithubOutput()`
Returns the string `echo "key=value" >> $GITHUB_OUTPUT`
<details><summary>Example</summary>

  ```ts
  import { echoKeyValue } from '@github-actions-workflow-ts/lib'

  // echoKeyValue.toGithubOutput(key, value, to) returns 'echo "key=value" >> $GITHUB_OUTPUT'
  echoKeyValue.toGithubOutput('NODE_VERSION', '18')
  // 'echo "NODE_VERSION=18" >> $GITHUB_OUTPUT'
  ```
</details>

## Contributing
See the [Contributing Guide](./.github/CONTRIBUTING.md)

## Credits
Inspired by [webiny/github-actions-wac](https://github.com/webiny/github-actions-wac) which is also the original source of the filename extension (`.wac.ts`) used to distinguish the Github Actions YAML workflow TypeScript files. When I hit too many limitations with `github-actions-wac`, I decided to create `github-actions-workflow-ts` to address those limitations and add a lot more functionality.
