[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Types6

# Type Alias: Types6

> **Types6** = \[`unknown`, `...unknown[]`\] \| `string` & (`"opened"` \| `"edited"` \| `"deleted"` \| `"transferred"` \| `"pinned"` \| `"unpinned"` \| `"closed"` \| `"reopened"` \| `"assigned"` \| `"unassigned"` \| `"labeled"` \| `"unlabeled"` \| `"locked"` \| `"unlocked"` \| `"milestoned"` \| `"demilestoned"`)[]

Defined in: [types/githubActionsWorkflow.ts:162](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L162)

Selects the types of activity that will trigger a workflow run. Most GitHub events are triggered by more than one type of activity. For example, the event for the release resource is triggered when a release is published, unpublished, created, edited, deleted, or prereleased. The types keyword enables you to narrow down activity that causes the workflow to run. When only one activity type triggers a webhook event, the types keyword is unnecessary.
You can use an array of event types. For more information about each event and their activity types, see https://help.github.com/en/articles/events-that-trigger-workflows#webhook-events.
