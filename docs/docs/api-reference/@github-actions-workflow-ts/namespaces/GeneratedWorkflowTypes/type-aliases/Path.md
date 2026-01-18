[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Path

# Type Alias: Path

> **Path** = \[`string`, `...string[]`\]

Defined in: [types/githubActionsWorkflow.ts:321](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L321)

When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths. Path filters are not evaluated for pushes to tags.
The paths-ignore and paths keywords accept glob patterns that use the * and ** wildcard characters to match more than one path name. For more information, see https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet.
You can exclude paths using two types of filters. You cannot use both of these filters for the same event in a workflow.
- paths-ignore - Use the paths-ignore filter when you only need to exclude path names.
- paths - Use the paths filter when you need to filter paths for positive matches and exclude paths.

## Min Items

1
