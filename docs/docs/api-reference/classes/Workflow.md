[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / Workflow

# Class: Workflow

Defined in: [workflow/index.ts:41](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/workflow/index.ts#L41)

Represents a GitHub Actions workflow.

The Workflow class is the top-level container for defining a GitHub Actions workflow.
It allows you to configure workflow triggers, add jobs, and set environment variables.

## Examples

```typescript
const workflow = new Workflow('ci', {
  name: 'CI',
  on: { push: { branches: ['main'] } },
})
workflow.addJob(testJob)
```

```typescript
// With custom output path
const workflow = new Workflow('deploy', {
  name: 'Deploy',
  on: { push: { branches: ['main'] } },
}, { outputPath: 'packages/app-a/.github/workflows' })
```

## Constructors

### Constructor

> **new Workflow**(`filename`, `workflowProps`, `options?`): `Workflow`

Defined in: [workflow/index.ts:86](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/workflow/index.ts#L86)

#### Parameters

##### filename

`string`

##### workflowProps

`Partial`&lt;[`Workflow`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/interfaces/Workflow.md)&gt;

##### options?

[`WorkflowOptions`](../type-aliases/WorkflowOptions.md)

#### Returns

`Workflow`

## Properties

### filename?

> `optional` **filename?**: `string`

Defined in: [workflow/index.ts:47](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/workflow/index.ts#L47)

The filename of the workflow e.g. `main.yml`

***

### outputPath?

> `optional` **outputPath?**: `string`

Defined in: [workflow/index.ts:53](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/workflow/index.ts#L53)

Custom output path for this workflow.
If set, overrides any config file settings.

***

### workflow

> **workflow**: `Partial`&lt;[`Workflow`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/interfaces/Workflow.md)&gt;

Defined in: [workflow/index.ts:42](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/workflow/index.ts#L42)

## Methods

### addEnvs()

> **addEnvs**(`envs`): `this`

Defined in: [workflow/index.ts:55](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/workflow/index.ts#L55)

#### Parameters

##### envs

`string` \| \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \} \| `undefined`

#### Returns

`this`

***

### addJob()

> **addJob**(`job`): `this`

Defined in: [workflow/index.ts:77](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/workflow/index.ts#L77)

#### Parameters

##### job

[`NormalJob`](NormalJob.md) \| [`ReusableWorkflowCallJob`](ReusableWorkflowCallJob.md)

#### Returns

`this`

***

### addJobs()

> **addJobs**(`jobs`): `this`

Defined in: [workflow/index.ts:68](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/workflow/index.ts#L68)

#### Parameters

##### jobs

([`NormalJob`](NormalJob.md) \| [`ReusableWorkflowCallJob`](ReusableWorkflowCallJob.md))[]

#### Returns

`this`
