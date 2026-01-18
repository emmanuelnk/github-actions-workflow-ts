[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / NormalJob

# Class: NormalJob

Defined in: [job/index.ts:18](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L18)

Represents a standard GitHub Actions job that runs on a specified runner.

A NormalJob contains steps that execute commands or actions on a runner.
Jobs can depend on other jobs using the `needs` method.

## Example

```typescript
const testJob = new NormalJob('test', {
  'runs-on': 'ubuntu-latest',
})
testJob.addStep(new Step({ name: 'Checkout', uses: 'actions/checkout@v4' }))
```

## Constructors

### Constructor

> **new NormalJob**(`name`, `jobProps`): `NormalJob`

Defined in: [job/index.ts:63](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L63)

#### Parameters

##### name

`string`

##### jobProps

[`NormalJob`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/interfaces/NormalJob.md)

#### Returns

`NormalJob`

## Properties

### job

> **job**: [`NormalJob`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/interfaces/NormalJob.md)

Defined in: [job/index.ts:20](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L20)

***

### name

> **name**: `string`

Defined in: [job/index.ts:19](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L19)

***

### steps

> **steps**: [`Step`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/type-aliases/Step.md)[] = `[]`

Defined in: [job/index.ts:21](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L21)

## Methods

### addEnvs()

> **addEnvs**(`envs`): `this`

Defined in: [job/index.ts:23](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L23)

#### Parameters

##### envs

`string` | \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \} | `undefined`

#### Returns

`this`

***

### addStep()

> **addStep**(`step`): `this`

Defined in: [job/index.ts:42](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L42)

#### Parameters

##### step

[`Step`](Step.md)

#### Returns

`this`

***

### addSteps()

> **addSteps**(`steps`): `this`

Defined in: [job/index.ts:34](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L34)

#### Parameters

##### steps

[`Step`](Step.md)[]

#### Returns

`this`

***

### needs()

> **needs**(`jobs`): `this`

Defined in: [job/index.ts:49](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/job/index.ts#L49)

#### Parameters

##### jobs

(`NormalJob` \| [`ReusableWorkflowCallJob`](ReusableWorkflowCallJob.md))[]

#### Returns

`this`
