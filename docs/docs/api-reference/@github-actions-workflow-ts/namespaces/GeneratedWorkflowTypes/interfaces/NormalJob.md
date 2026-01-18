[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / NormalJob

# Interface: NormalJob

Defined in: [types/githubActionsWorkflow.ts:770](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L770)

Each job must have an id to associate with the job. The key job_id is a string and its value is a map of the job's configuration data. You must replace \<job_id\> with a string that is unique to the jobs object. The \<job_id\> must start with a letter or _ and contain only alphanumeric characters, -, or _.

## Properties

### concurrency?

> `optional` **concurrency**: `string` \| [`Concurrency`](Concurrency.md)

Defined in: [types/githubActionsWorkflow.ts:863](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L863)

Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. A concurrency group can be any string or expression. The expression can use any context except for the secrets context.
You can also specify concurrency at the workflow level.
When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. Any previously pending job or workflow in the concurrency group will be canceled. To also cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true.

***

### container?

> `optional` **container**: `string` \| [`Container`](Container.md)

Defined in: [types/githubActionsWorkflow.ts:848](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L848)

A container to run any steps in a job that don't already specify a container. If you have steps that use both script and container actions, the container actions will run as sibling containers on the same network with the same volume mounts.
If you do not set a container, all steps will run directly on the host specified by runs-on unless a step refers to an action configured to run in a container.

***

### continue-on-error?

> `optional` **continue-on-error**: `string` \| `boolean`

Defined in: [types/githubActionsWorkflow.ts:843](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L843)

Prevents a workflow run from failing when a job fails. Set to true to allow a workflow run to pass when this job fails.

***

### defaults?

> `optional` **defaults**: [`Defaults1`](Defaults1.md)

Defined in: [types/githubActionsWorkflow.ts:809](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L809)

***

### env?

> `optional` **env**: `string` \| \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \}

Defined in: [types/githubActionsWorkflow.ts:804](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L804)

To set custom environment variables, you need to specify the variables in the workflow file. You can define environment variables for a step, job, or entire workflow using the jobs.\<job_id\>.steps[*].env, jobs.\<job_id\>.env, and env keywords. For more information, see https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsenv

***

### environment?

> `optional` **environment**: `string` \| [`Environment`](Environment.md)

Defined in: [types/githubActionsWorkflow.ts:794](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L794)

The environment that the job references.

***

### if?

> `optional` **if**: `string` \| `number` \| `boolean`

Defined in: [types/githubActionsWorkflow.ts:814](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L814)

You can use the if conditional to prevent a job from running unless a condition is met. You can use any supported context and expression to create a conditional.
Expressions in an if conditional do not require the $\{\{ \}\} syntax. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.

***

### name?

> `optional` **name**: `string`

Defined in: [types/githubActionsWorkflow.ts:774](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L774)

The name of the job displayed on GitHub.

***

### needs?

> `optional` **needs**: [`JobNeeds`](../type-aliases/JobNeeds.md)

Defined in: [types/githubActionsWorkflow.ts:775](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L775)

***

### outputs?

> `optional` **outputs**: `object`

Defined in: [types/githubActionsWorkflow.ts:798](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L798)

A map of outputs for a job. Job outputs are available to all downstream jobs that depend on this job.

#### Index Signature

\[`k`: `string`\]: `string`

***

### permissions?

> `optional` **permissions**: [`Permissions`](../type-aliases/Permissions.md)

Defined in: [types/githubActionsWorkflow.ts:777](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L777)

***

### runs-on

> **runs-on**: `string` \| \[`string`, `...string[]`\] & `unknown`[] \| \{\[`k`: `string`\]: `unknown`; `group?`: `string`; `labels?`: `string` \| `string`[]; \}

Defined in: [types/githubActionsWorkflow.ts:781](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L781)

The type of machine to run the job on. The machine can be either a GitHub-hosted runner, or a self-hosted runner.

***

### services?

> `optional` **services**: `object`

Defined in: [types/githubActionsWorkflow.ts:855](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L855)

Additional containers to host services for a job in a workflow. These are useful for creating databases or cache services like redis. The runner on the virtual machine will automatically create a network and manage the life cycle of the service containers.
When you use a service container for a job or your step uses container actions, you don't need to set port information to access the service. Docker automatically exposes all ports between containers on the same network.
When both the job and the action run in a container, you can directly reference the container by its hostname. The hostname is automatically mapped to the service name.
When a step does not use a container action, you must access the service using localhost and bind the ports.

#### Index Signature

\[`k`: `string`\]: [`Container`](Container.md)

***

### snapshot?

> `optional` **snapshot**: [`Snapshot`](../type-aliases/Snapshot.md)

Defined in: [types/githubActionsWorkflow.ts:776](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L776)

***

### steps?

> `optional` **steps**: \[[`Step`](../type-aliases/Step.md), `...Step[]`\]

Defined in: [types/githubActionsWorkflow.ts:821](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L821)

A job contains a sequence of tasks called steps. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry. Not all steps run actions, but all actions run as a step. Each step runs in its own process in the virtual environment and has access to the workspace and filesystem. Because steps run in their own process, changes to environment variables are not preserved between steps. GitHub provides built-in steps to set up and complete a job.
Must contain either `uses` or `run`

***

### strategy?

> `optional` **strategy**: `object`

Defined in: [types/githubActionsWorkflow.ts:829](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L829)

A strategy creates a build matrix for your jobs. You can define different variations of an environment to run each job in.

#### fail-fast?

> `optional` **fail-fast**: `string` \| `boolean`

When set to true, GitHub cancels all in-progress jobs if any matrix job fails. Default: true

#### matrix

> **matrix**: [`Matrix`](../type-aliases/Matrix.md)

#### max-parallel?

> `optional` **max-parallel**: `string` \| `number`

The maximum number of jobs that can run simultaneously when using a matrix job strategy. By default, GitHub will maximize the number of jobs run in parallel depending on the available runners on GitHub-hosted virtual machines.

***

### timeout-minutes?

> `optional` **timeout-minutes**: `string` \| `number`

Defined in: [types/githubActionsWorkflow.ts:825](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L825)

The maximum number of minutes to let a workflow run before GitHub automatically cancels it. Default: 360
