[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / CheckRunEvent

# Type Alias: CheckRunEvent

> **CheckRunEvent** = \{\[`k`: `string`\]: `unknown`; `types?`: [`CheckRunEventTypes`](CheckRunEventTypes.md); \} \| `null`

Defined in: [types/githubActionsWorkflow.ts:64](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L64)

Runs your workflow anytime the check_run event occurs. More than one activity type triggers this event. For information about the REST API, see https://developer.github.com/v3/checks/runs.
