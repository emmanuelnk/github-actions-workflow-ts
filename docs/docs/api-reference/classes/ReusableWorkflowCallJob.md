[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / ReusableWorkflowCallJob

# Class: ReusableWorkflowCallJob

Defined in: [job/index.ts:83](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/job/index.ts#L83)

Represents a job that calls a reusable workflow.

A ReusableWorkflowCallJob allows you to call another workflow file,
either from the same repository or an external repository.

## Example

```typescript
const deployJob = new ReusableWorkflowCallJob('deploy', {
  uses: './.github/workflows/deploy.yml',
  with: { environment: 'production' },
})
```

## Constructors

### Constructor

> **new ReusableWorkflowCallJob**(`name`, `jobProps`): `ReusableWorkflowCallJob`

Defined in: [job/index.ts:101](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/job/index.ts#L101)

#### Parameters

##### name

`string`

##### jobProps

[`ReusableWorkflowCallJob`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/interfaces/ReusableWorkflowCallJob.md)

#### Returns

`ReusableWorkflowCallJob`

## Properties

### job

> **job**: [`ReusableWorkflowCallJob`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/interfaces/ReusableWorkflowCallJob.md)

Defined in: [job/index.ts:85](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/job/index.ts#L85)

***

### name

> **name**: `string`

Defined in: [job/index.ts:84](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/job/index.ts#L84)

## Methods

### needs()

> **needs**(`jobs`): `this`

Defined in: [job/index.ts:87](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/job/index.ts#L87)

#### Parameters

##### jobs

([`NormalJob`](NormalJob.md) \| `ReusableWorkflowCallJob`)[]

#### Returns

`this`
