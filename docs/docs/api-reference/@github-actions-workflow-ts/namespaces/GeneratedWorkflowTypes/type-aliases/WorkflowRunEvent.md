[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / WorkflowRunEvent

# Type Alias: WorkflowRunEvent

> **WorkflowRunEvent** = \{\[`k`: `string`\]: `unknown`; `types?`: [`WorkflowRunEventTypes`](WorkflowRunEventTypes.md); `workflows?`: \[`string`, `...string[]`\]; \} \| `null`

Defined in: [types/githubActionsWorkflow.ts:491](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L491)

This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow. For example, if your pull_request workflow generates build artifacts, you can create a new workflow that uses workflow_run to analyze the results and add a comment to the original pull request.
