[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / ProjectEventTypes

# Type Alias: ProjectEventTypes

> **ProjectEventTypes** = \[`unknown`, `...unknown[]`\] \| `string` & (`"created"` \| `"updated"` \| `"closed"` \| `"reopened"` \| `"edited"` \| `"deleted"`)[]

Defined in: [types/githubActionsWorkflow.ts:262](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L262)

Selects the types of activity that will trigger a workflow run. Most GitHub events are triggered by more than one type of activity. For example, the event for the release resource is triggered when a release is published, unpublished, created, edited, deleted, or prereleased. The types keyword enables you to narrow down activity that causes the workflow to run. When only one activity type triggers a webhook event, the types keyword is unnecessary.
You can use an array of event types. For more information about each event and their activity types, see https://help.github.com/en/articles/events-that-trigger-workflows#webhook-events.
