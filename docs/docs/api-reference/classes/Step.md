[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / Step

# Class: Step

Defined in: [step/index.ts:18](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/step/index.ts#L18)

Represents a single step within a GitHub Actions job.

A Step can either run a shell command (`run`) or use a GitHub Action (`uses`).
Steps execute sequentially within a job.

## Example

```typescript
// Run a shell command
const testStep = new Step({ name: 'Run tests', run: 'npm test' })

// Use a GitHub Action
const checkoutStep = new Step({ name: 'Checkout', uses: 'actions/checkout@v4' })
```

## Constructors

### Constructor

> **new Step**(`stepProps`): `Step`

Defined in: [step/index.ts:35](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/step/index.ts#L35)

#### Parameters

##### stepProps

[`Step`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/type-aliases/Step.md)

#### Returns

`Step`

## Properties

### id

> **id**: `string` \| `undefined`

Defined in: [step/index.ts:20](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/step/index.ts#L20)

***

### step

> **step**: [`Step`](../@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/type-aliases/Step.md)

Defined in: [step/index.ts:19](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/step/index.ts#L19)

## Methods

### addEnvs()

> **addEnvs**(`envs`): `this`

Defined in: [step/index.ts:22](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/step/index.ts#L22)

#### Parameters

##### envs

(string \| \{ \[k: string\]: string \| number \| boolean; \}) & (string \| \{ \[k: string\]: string \| number \| boolean; \}) | `undefined`

#### Returns

`this`
