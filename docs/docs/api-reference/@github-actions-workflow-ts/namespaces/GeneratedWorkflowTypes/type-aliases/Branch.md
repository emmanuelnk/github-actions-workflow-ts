[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Branch

# Type Alias: Branch

> **Branch** = \[`string`, `...string[]`\]

Defined in: [types/githubActionsWorkflow.ts:211](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L211)

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. If you only define only tags or only branches, the workflow won't run for events affecting the undefined Git ref.
The branches, branches-ignore, tags, and tags-ignore keywords accept glob patterns that use the * and ** wildcard characters to match more than one branch or tag name. For more information, see https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet.
The patterns defined in branches and tags are evaluated against the Git ref's name. For example, defining the pattern mona/octocat in branches will match the refs/heads/mona/octocat Git ref. The pattern releases/** will match the refs/heads/releases/10 Git ref.
You can use two types of filters to prevent a workflow from running on pushes and pull requests to tags and branches:
- branches or branches-ignore - You cannot use both the branches and branches-ignore filters for the same event in a workflow. Use the branches filter when you need to filter branches for positive matches and exclude branches. Use the branches-ignore filter when you only need to exclude branch names.
- tags or tags-ignore - You cannot use both the tags and tags-ignore filters for the same event in a workflow. Use the tags filter when you need to filter tags for positive matches and exclude tags. Use the tags-ignore filter when you only need to exclude tag names.
You can exclude tags and branches using the ! character. The order that you define patterns matters.
- A matching negative pattern (prefixed with !) after a positive match will exclude the Git ref.
- A matching positive pattern after a negative match will include the Git ref again.
