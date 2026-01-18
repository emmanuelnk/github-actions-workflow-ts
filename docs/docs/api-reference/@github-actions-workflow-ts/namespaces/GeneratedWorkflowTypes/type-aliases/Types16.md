[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Types16

# Type Alias: Types16

> **Types16** = \[`unknown`, `...unknown[]`\] \| `string` & (`"assigned"` \| `"unassigned"` \| `"labeled"` \| `"unlabeled"` \| `"opened"` \| `"edited"` \| `"closed"` \| `"reopened"` \| `"synchronize"` \| `"converted_to_draft"` \| `"ready_for_review"` \| `"locked"` \| `"unlocked"` \| `"review_requested"` \| `"review_request_removed"` \| `"auto_merge_enabled"` \| `"auto_merge_disabled"`)[]

Defined in: [types/githubActionsWorkflow.ts:364](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L364)

Selects the types of activity that will trigger a workflow run. Most GitHub events are triggered by more than one type of activity. For example, the event for the release resource is triggered when a release is published, unpublished, created, edited, deleted, or prereleased. The types keyword enables you to narrow down activity that causes the workflow to run. When only one activity type triggers a webhook event, the types keyword is unnecessary.
You can use an array of event types. For more information about each event and their activity types, see https://help.github.com/en/articles/events-that-trigger-workflows#webhook-events.
