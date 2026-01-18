[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / ReusableWorkflowCallJob

# Interface: ReusableWorkflowCallJob

Defined in: [types/githubActionsWorkflow.ts:945](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L945)

Each job must have an id to associate with the job. The key job_id is a string and its value is a map of the job's configuration data. You must replace \<job_id\> with a string that is unique to the jobs object. The \<job_id\> must start with a letter or _ and contain only alphanumeric characters, -, or _.

## Properties

### concurrency?

> `optional` **concurrency**: `string` \| [`Concurrency`](Concurrency.md)

Defined in: [types/githubActionsWorkflow.ts:992](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L992)

Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. A concurrency group can be any string or expression. The expression can use any context except for the secrets context.
You can also specify concurrency at the workflow level.
When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. Any previously pending job or workflow in the concurrency group will be canceled. To also cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true.

***

### if?

> `optional` **if**: `string` \| `number` \| `boolean`

Defined in: [types/githubActionsWorkflow.ts:956](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L956)

You can use the if conditional to prevent a job from running unless a condition is met. You can use any supported context and expression to create a conditional.
Expressions in an if conditional do not require the $\{\{ \}\} syntax. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.

***

### name?

> `optional` **name**: `string`

Defined in: [types/githubActionsWorkflow.ts:949](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L949)

The name of the job displayed on GitHub.

***

### needs?

> `optional` **needs**: [`JobNeeds`](../type-aliases/JobNeeds.md)

Defined in: [types/githubActionsWorkflow.ts:950](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L950)

***

### permissions?

> `optional` **permissions**: [`Permissions`](../type-aliases/Permissions.md)

Defined in: [types/githubActionsWorkflow.ts:951](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L951)

***

### secrets?

> `optional` **secrets**: [`Env1`](../type-aliases/Env1.md)

Defined in: [types/githubActionsWorkflow.ts:972](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L972)

When a job is used to call a reusable workflow, you can use 'secrets' to provide a map of secrets that are passed to the called workflow. Any secrets that you pass must match the names defined in the called workflow.

***

### strategy?

> `optional` **strategy**: `object`

Defined in: [types/githubActionsWorkflow.ts:976](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L976)

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

### uses

> **uses**: `string`

Defined in: [types/githubActionsWorkflow.ts:960](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L960)

The location and version of a reusable workflow file to run as a job, of the form './\{path/to\}/\{localfile\}.yml' or '\{owner\}/\{repo\}/\{path\}/\{filename\}@\{ref\}'. \{ref\} can be a SHA, a release tag, or a branch name. Using the commit SHA is the safest for stability and security.

***

### with?

> `optional` **with**: `string` \| \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \}

Defined in: [types/githubActionsWorkflow.ts:964](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L964)

A map of inputs that are passed to the called workflow. Any inputs that you pass must match the input specifications defined in the called workflow. Unlike 'jobs.\<job_id\>.steps[*].with', the inputs you pass with 'jobs.\<job_id\>.with' are not be available as environment variables in the called workflow. Instead, you can reference the inputs by using the inputs context.
