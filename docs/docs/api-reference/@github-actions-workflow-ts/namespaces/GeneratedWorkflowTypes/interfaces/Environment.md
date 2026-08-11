[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Environment

# Interface: Environment

Defined in: [types/githubActionsWorkflow.ts:1271](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1271)

The environment that the job references

## Properties

### deployment?

> `optional` **deployment?**: `string` \| `boolean`

Defined in: [types/githubActionsWorkflow.ts:1283](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1283)

Whether to create a deployment for this job. Setting to false lets the job use environment secrets and variables without creating a deployment record. Wait timers and required reviewers still apply.

***

### name

> **name**: `string`

Defined in: [types/githubActionsWorkflow.ts:1275](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1275)

The name of the environment configured in the repo.

***

### url?

> `optional` **url?**: `string`

Defined in: [types/githubActionsWorkflow.ts:1279](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1279)

A deployment URL
