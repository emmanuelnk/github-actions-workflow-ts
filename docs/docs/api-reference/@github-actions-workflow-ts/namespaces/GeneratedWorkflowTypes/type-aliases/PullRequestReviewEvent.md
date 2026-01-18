[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / PullRequestReviewEvent

# Type Alias: PullRequestReviewEvent

> **PullRequestReviewEvent** = \{\[`k`: `string`\]: `unknown`; \} \| `null`

Defined in: [types/githubActionsWorkflow.ts:228](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L228)

Runs your workflow anytime the pull_request_review event occurs. More than one activity type triggers this event. For information about the REST API, see https://developer.github.com/v3/pulls/reviews.
Note: Workflows do not run on private base repositories when you open a pull request from a forked repository.
When you create a pull request from a forked repository to the base repository, GitHub sends the pull_request event to the base repository and no pull request events occur on the forked repository.
Workflows don't run on forked repositories by default. You must enable GitHub Actions in the Actions tab of the forked repository.
The permissions for the GITHUB_TOKEN in forked repositories is read-only. For more information about the GITHUB_TOKEN, see https://help.github.com/en/articles/virtual-environments-for-github-actions.
