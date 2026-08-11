[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Concurrency

# Interface: Concurrency

Defined in: [types/githubActionsWorkflow.ts:1139](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1139)

## Properties

### cancel-in-progress?

> `optional` **cancel-in-progress?**: `string` \| `boolean`

Defined in: [types/githubActionsWorkflow.ts:1147](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1147)

To cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true.

***

### group

> **group**: `string`

Defined in: [types/githubActionsWorkflow.ts:1143](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1143)

When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. By default any previously pending job or workflow in the concurrency group will be canceled; this behavior can be changed with `queue`.

***

### queue?

> `optional` **queue?**: `"single"` \| `"max"`

Defined in: [types/githubActionsWorkflow.ts:1151](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1151)

Controls how pending jobs or workflow runs are queued within a concurrency group. With the default `single`, at most one run can be pending — additional pending runs cancel the previous one. With `max`, up to 100 runs can be pending and are processed in FIFO order. The combination of `queue: max` and `cancel-in-progress: true` is not allowed.
