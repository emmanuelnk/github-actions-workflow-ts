[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Concurrency

# Interface: Concurrency

Defined in: [types/githubActionsWorkflow.ts:954](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L954)

## Properties

### cancel-in-progress?

> `optional` **cancel-in-progress**: `string` \| `boolean`

Defined in: [types/githubActionsWorkflow.ts:962](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L962)

To cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true.

***

### group

> **group**: `string`

Defined in: [types/githubActionsWorkflow.ts:958](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L958)

When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. Any previously pending job or workflow in the concurrency group will be canceled.
