[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / Workflow

# Class: Workflow

Defined in: [workflow/index.ts:19](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/workflow/index.ts#L19)

Represents a GitHub Actions workflow.

The Workflow class is the top-level container for defining a GitHub Actions workflow.
It allows you to configure workflow triggers, add jobs, and set environment variables.

## Example

```typescript
const workflow = new Workflow('ci', {
  name: 'CI',
  on: { push: { branches: ['main'] } },
})
workflow.addJob(testJob)
```

## Constructors

### Constructor

> **new Workflow**(`filename`, `workflowProps`): `Workflow`

Defined in: [workflow/index.ts:58](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/workflow/index.ts#L58)

#### Parameters

##### filename

`string`

##### workflowProps

`Partial`&lt;[`Workflow`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/interfaces/Workflow.md)&gt;

#### Returns

`Workflow`

## Properties

### filename?

> `optional` **filename**: `string`

Defined in: [workflow/index.ts:25](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/workflow/index.ts#L25)

The filename of the workflow e.g. `main.yml`

***

### workflow

> **workflow**: `Partial`&lt;[`Workflow`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/interfaces/Workflow.md)&gt;

Defined in: [workflow/index.ts:20](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/workflow/index.ts#L20)

## Methods

### addEnvs()

> **addEnvs**(`envs`): `this`

Defined in: [workflow/index.ts:27](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/workflow/index.ts#L27)

#### Parameters

##### envs

`string` | \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \} | `undefined`

#### Returns

`this`

***

### addJob()

> **addJob**(`job`): `this`

Defined in: [workflow/index.ts:49](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/workflow/index.ts#L49)

#### Parameters

##### job

[`NormalJob`](NormalJob.md) | [`ReusableWorkflowCallJob`](ReusableWorkflowCallJob.md)

#### Returns

`this`

***

### addJobs()

> **addJobs**(`jobs`): `this`

Defined in: [workflow/index.ts:40](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/workflow/index.ts#L40)

#### Parameters

##### jobs

([`NormalJob`](NormalJob.md) \| [`ReusableWorkflowCallJob`](ReusableWorkflowCallJob.md))[]

#### Returns

`this`
