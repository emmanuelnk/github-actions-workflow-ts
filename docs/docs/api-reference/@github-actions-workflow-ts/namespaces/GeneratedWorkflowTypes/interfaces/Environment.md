[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Environment

# Interface: Environment

Defined in: [types/githubActionsWorkflow.ts:1273](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1273)

The environment that the job references

## Properties

### deployment?

> `optional` **deployment?**: `string` \| `boolean`

Defined in: [types/githubActionsWorkflow.ts:1285](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1285)

Whether to create a deployment for this job. Setting to false lets the job use environment secrets and variables without creating a deployment record. Wait timers and required reviewers still apply.

***

### name

> **name**: `string`

Defined in: [types/githubActionsWorkflow.ts:1277](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1277)

The name of the environment configured in the repo.

***

### url?

> `optional` **url?**: `string`

Defined in: [types/githubActionsWorkflow.ts:1281](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1281)

A deployment URL
