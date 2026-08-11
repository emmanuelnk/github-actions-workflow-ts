[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / IssuesEventTypes

# Type Alias: IssuesEventTypes

> **IssuesEventTypes** = \[`unknown`, `...unknown[]`\] \| `string` & (`"opened"` \| `"edited"` \| `"deleted"` \| `"transferred"` \| `"pinned"` \| `"unpinned"` \| `"closed"` \| `"reopened"` \| `"assigned"` \| `"unassigned"` \| `"labeled"` \| `"unlabeled"` \| `"locked"` \| `"unlocked"` \| `"milestoned"` \| `"demilestoned"`)[]

Defined in: [types/githubActionsWorkflow.ts:187](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L187)

Selects the types of activity that will trigger a workflow run. Most GitHub events are triggered by more than one type of activity. For example, the event for the release resource is triggered when a release is published, unpublished, created, edited, deleted, or prereleased. The types keyword enables you to narrow down activity that causes the workflow to run. When only one activity type triggers a webhook event, the types keyword is unnecessary.
You can use an array of event types. For more information about each event and their activity types, see https://help.github.com/en/articles/events-that-trigger-workflows#webhook-events.
