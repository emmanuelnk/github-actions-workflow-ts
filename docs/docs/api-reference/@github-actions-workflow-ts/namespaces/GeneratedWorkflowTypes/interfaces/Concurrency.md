[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Concurrency

# Interface: Concurrency

Defined in: [types/githubActionsWorkflow.ts:757](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L757)

## Properties

### cancel-in-progress?

> `optional` **cancel-in-progress**: `string` \| `boolean`

Defined in: [types/githubActionsWorkflow.ts:765](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L765)

To cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true.

***

### group

> **group**: `string`

Defined in: [types/githubActionsWorkflow.ts:761](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L761)

When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. Any previously pending job or workflow in the concurrency group will be canceled.
