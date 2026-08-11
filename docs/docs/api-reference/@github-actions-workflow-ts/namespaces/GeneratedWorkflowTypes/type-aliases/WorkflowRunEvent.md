[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / WorkflowRunEvent

# Type Alias: WorkflowRunEvent

> **WorkflowRunEvent** = \{\[`k`: `string`\]: `unknown`; `types?`: [`WorkflowRunEventTypes`](WorkflowRunEventTypes.md); `workflows?`: \[`string`, `...string[]`\]; \} \| `null`

Defined in: [types/githubActionsWorkflow.ts:493](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L493)

This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow. For example, if your pull_request workflow generates build artifacts, you can create a new workflow that uses workflow_run to analyze the results and add a comment to the original pull request.
