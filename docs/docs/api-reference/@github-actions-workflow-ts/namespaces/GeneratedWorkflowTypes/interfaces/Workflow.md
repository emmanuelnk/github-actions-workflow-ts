[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Workflow

# Interface: Workflow

Defined in: [types/githubActionsWorkflow.ts:519](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L519)

## Properties

### concurrency?

> `optional` **concurrency**: `string` \| [`Concurrency`](Concurrency.md)

Defined in: [types/githubActionsWorkflow.ts:729](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L729)

Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. A concurrency group can be any string or expression. The expression can use any context except for the secrets context.
You can also specify concurrency at the workflow level.
When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. Any previously pending job or workflow in the concurrency group will be canceled. To also cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true.

***

### defaults?

> `optional` **defaults**: [`Defaults`](Defaults.md)

Defined in: [types/githubActionsWorkflow.ts:723](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L723)

***

### env?

> `optional` **env**: `string` \| \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \}

Defined in: [types/githubActionsWorkflow.ts:718](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L718)

To set custom environment variables, you need to specify the variables in the workflow file. You can define environment variables for a step, job, or entire workflow using the jobs.\<job_id\>.steps[*].env, jobs.\<job_id\>.env, and env keywords. For more information, see https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsenv

***

### jobs

> **jobs**: `object`

Defined in: [types/githubActionsWorkflow.ts:735](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L735)

A workflow run is made up of one or more jobs. Jobs run in parallel by default. To run jobs sequentially, you can define dependencies on other jobs using the jobs.\<job_id\>.needs keyword.
Each job runs in a fresh instance of the virtual environment specified by runs-on.
You can run an unlimited number of jobs as long as you are within the workflow usage limits. For more information, see https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#usage-limits.

#### Index Signature

\[`k`: `string`\]: [`NormalJob`](NormalJob.md) \| [`ReusableWorkflowCallJob`](ReusableWorkflowCallJob.md)

This interface was referenced by `undefined`'s JSON-Schema definition
via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".

***

### name?

> `optional` **name**: `string`

Defined in: [types/githubActionsWorkflow.ts:523](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L523)

The name of your workflow. GitHub displays the names of your workflows on your repository's actions page. If you omit this field, GitHub sets the name to the workflow's filename.

***

### on

> **on**: [`Event`](../type-aliases/Event.md) \| \[[`Event`](../type-aliases/Event.md), `...Event[]`\] \| \{ `branch_protection_rule?`: BranchProtectionRuleEvent \| undefined; `check_run?`: CheckRunEvent \| undefined; `check_suite?`: CheckSuiteEvent \| undefined; `create?`: CreateEvent \| undefined; `delete?`: DeleteEvent \| undefined; `deployment?`: DeploymentEvent \| undefined; `deployment_status?`: DeploymentStatusEvent \| undefined; `discussion?`: DiscussionEvent \| undefined; `discussion_comment?`: DiscussionCommentEvent \| undefined; `fork?`: ForkEvent \| undefined; `gollum?`: GollumEvent \| undefined; `issue_comment?`: IssueCommentEvent \| undefined; `issues?`: IssuesEvent \| undefined; `label?`: LabelEvent \| undefined; `merge_group?`: MergeGroupEvent \| undefined; `milestone?`: MilestoneEvent \| undefined; `page_build?`: PageBuildEvent \| undefined; `project?`: ProjectEvent \| undefined; `project_card?`: ProjectCardEvent \| undefined; `project_column?`: ProjectColumnEvent \| undefined; `public?`: PublicEvent \| undefined; `pull_request?`: `object` & `object` \| `null`; `pull_request_review?`: PullRequestReviewEvent \| undefined; `pull_request_review_comment?`: PullRequestReviewCommentEvent \| undefined; `pull_request_target?`: `object` & `object` \| `null`; `push?`: `object` & `object` \| `null`; `registry_package?`: RegistryPackageEvent \| undefined; `release?`: ReleaseEvent \| undefined; `repository_dispatch?`: RepositoryDispatchEvent \| undefined; `schedule?`: \[\{ `cron?`: `string`; \}, `...{ cron?: string }[]`\]; `status?`: StatusEvent \| undefined; `watch?`: WatchEvent \| undefined; `workflow_call?`: \{\[`k`: `string`\]: `unknown`; `inputs?`: \{\[`k`: `string`\]: `object`; \}; `outputs?`: \{\[`k`: `string`\]: `object`; \}; `secrets?`: \{\[`k`: `string`\]: `object`; \}; \}; `workflow_dispatch?`: \{ `inputs?`: \{\[`k`: `string`\]: [`WorkflowDispatchInput`](../type-aliases/WorkflowDispatchInput.md); \}; \}; `workflow_run?`: WorkflowRunEvent \| undefined; \}

Defined in: [types/githubActionsWorkflow.ts:527](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L527)

The name of the GitHub event that triggers the workflow. You can provide a single event string, array of events, array of event types, or an event configuration map that schedules a workflow or restricts the execution of a workflow to specific files, tags, or branch changes. For a list of available events, see https://help.github.com/en/github/automating-your-workflow-with-github-actions/events-that-trigger-workflows.

#### Type Declaration

[`Event`](../type-aliases/Event.md)

\[[`Event`](../type-aliases/Event.md), `...Event[]`\]

\{ `branch_protection_rule?`: BranchProtectionRuleEvent \| undefined; `check_run?`: CheckRunEvent \| undefined; `check_suite?`: CheckSuiteEvent \| undefined; `create?`: CreateEvent \| undefined; `delete?`: DeleteEvent \| undefined; `deployment?`: DeploymentEvent \| undefined; `deployment_status?`: DeploymentStatusEvent \| undefined; `discussion?`: DiscussionEvent \| undefined; `discussion_comment?`: DiscussionCommentEvent \| undefined; `fork?`: ForkEvent \| undefined; `gollum?`: GollumEvent \| undefined; `issue_comment?`: IssueCommentEvent \| undefined; `issues?`: IssuesEvent \| undefined; `label?`: LabelEvent \| undefined; `merge_group?`: MergeGroupEvent \| undefined; `milestone?`: MilestoneEvent \| undefined; `page_build?`: PageBuildEvent \| undefined; `project?`: ProjectEvent \| undefined; `project_card?`: ProjectCardEvent \| undefined; `project_column?`: ProjectColumnEvent \| undefined; `public?`: PublicEvent \| undefined; `pull_request?`: `object` & `object` \| `null`; `pull_request_review?`: PullRequestReviewEvent \| undefined; `pull_request_review_comment?`: PullRequestReviewCommentEvent \| undefined; `pull_request_target?`: `object` & `object` \| `null`; `push?`: `object` & `object` \| `null`; `registry_package?`: RegistryPackageEvent \| undefined; `release?`: ReleaseEvent \| undefined; `repository_dispatch?`: RepositoryDispatchEvent \| undefined; `schedule?`: \[\{ `cron?`: `string`; \}, `...{ cron?: string }[]`\]; `status?`: StatusEvent \| undefined; `watch?`: WatchEvent \| undefined; `workflow_call?`: \{\[`k`: `string`\]: `unknown`; `inputs?`: \{\[`k`: `string`\]: `object`; \}; `outputs?`: \{\[`k`: `string`\]: `object`; \}; `secrets?`: \{\[`k`: `string`\]: `object`; \}; \}; `workflow_dispatch?`: \{ `inputs?`: \{\[`k`: `string`\]: [`WorkflowDispatchInput`](../type-aliases/WorkflowDispatchInput.md); \}; \}; `workflow_run?`: WorkflowRunEvent \| undefined; \}

#### branch\_protection\_rule?

> `optional` **branch\_protection\_rule**: BranchProtectionRuleEvent \| undefined

#### check\_run?

> `optional` **check\_run**: CheckRunEvent \| undefined

#### check\_suite?

> `optional` **check\_suite**: CheckSuiteEvent \| undefined

#### create?

> `optional` **create**: CreateEvent \| undefined

#### delete?

> `optional` **delete**: DeleteEvent \| undefined

#### deployment?

> `optional` **deployment**: DeploymentEvent \| undefined

#### deployment\_status?

> `optional` **deployment\_status**: DeploymentStatusEvent \| undefined

#### discussion?

> `optional` **discussion**: DiscussionEvent \| undefined

#### discussion\_comment?

> `optional` **discussion\_comment**: DiscussionCommentEvent \| undefined

#### fork?

> `optional` **fork**: ForkEvent \| undefined

#### gollum?

> `optional` **gollum**: GollumEvent \| undefined

#### issue\_comment?

> `optional` **issue\_comment**: IssueCommentEvent \| undefined

#### issues?

> `optional` **issues**: IssuesEvent \| undefined

#### label?

> `optional` **label**: LabelEvent \| undefined

#### merge\_group?

> `optional` **merge\_group**: MergeGroupEvent \| undefined

#### milestone?

> `optional` **milestone**: MilestoneEvent \| undefined

#### page\_build?

> `optional` **page\_build**: PageBuildEvent \| undefined

#### project?

> `optional` **project**: ProjectEvent \| undefined

#### project\_card?

> `optional` **project\_card**: ProjectCardEvent \| undefined

#### project\_column?

> `optional` **project\_column**: ProjectColumnEvent \| undefined

#### public?

> `optional` **public**: PublicEvent \| undefined

#### pull\_request?

> `optional` **pull\_request**: `object` & `object` \| `null`

Runs your workflow anytime the pull_request event occurs. More than one activity type triggers this event. For information about the REST API, see https://developer.github.com/v3/pulls.
Note: Workflows do not run on private base repositories when you open a pull request from a forked repository.
When you create a pull request from a forked repository to the base repository, GitHub sends the pull_request event to the base repository and no pull request events occur on the forked repository.
Workflows don't run on forked repositories by default. You must enable GitHub Actions in the Actions tab of the forked repository.
The permissions for the GITHUB_TOKEN in forked repositories is read-only. For more information about the GITHUB_TOKEN, see https://help.github.com/en/articles/virtual-environments-for-github-actions.

#### pull\_request\_review?

> `optional` **pull\_request\_review**: PullRequestReviewEvent \| undefined

#### pull\_request\_review\_comment?

> `optional` **pull\_request\_review\_comment**: PullRequestReviewCommentEvent \| undefined

#### pull\_request\_target?

> `optional` **pull\_request\_target**: `object` & `object` \| `null`

This event is similar to pull_request, except that it runs in the context of the base repository of the pull request, rather than in the merge commit. This means that you can more safely make your secrets available to the workflows triggered by the pull request, because only workflows defined in the commit on the base repository are run. For example, this event allows you to create workflows that label and comment on pull requests, based on the contents of the event payload.

#### push?

> `optional` **push**: `object` & `object` \| `null`

Runs your workflow when someone pushes to a repository branch, which triggers the push event.
Note: The webhook payload available to GitHub Actions does not include the added, removed, and modified attributes in the commit object. You can retrieve the full commit object using the REST API. For more information, see https://developer.github.com/v3/repos/commits/#get-a-single-commit.

#### registry\_package?

> `optional` **registry\_package**: RegistryPackageEvent \| undefined

#### release?

> `optional` **release**: ReleaseEvent \| undefined

#### repository\_dispatch?

> `optional` **repository\_dispatch**: RepositoryDispatchEvent \| undefined

#### schedule?

> `optional` **schedule**: \[\{ `cron?`: `string`; \}, `...{ cron?: string }[]`\]

You can schedule a workflow to run at specific UTC times using POSIX cron syntax (https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07). Scheduled workflows run on the latest commit on the default or base branch. The shortest interval you can run scheduled workflows is once every 5 minutes.
Note: GitHub Actions does not support the non-standard syntax @yearly, @monthly, @weekly, @daily, @hourly, and @reboot.
You can use crontab guru (https://crontab.guru/). to help generate your cron syntax and confirm what time it will run. To help you get started, there is also a list of crontab guru examples (https://crontab.guru/examples.html).

#### status?

> `optional` **status**: StatusEvent \| undefined

#### watch?

> `optional` **watch**: WatchEvent \| undefined

#### workflow\_call?

> `optional` **workflow\_call**: `object`

Allows workflows to be reused by other workflows.

##### Index Signature

\[`k`: `string`\]: `unknown`

##### workflow\_call.inputs?

> `optional` **inputs**: `object`

When using the workflow_call keyword, you can optionally specify inputs that are passed to the called workflow from the caller workflow.

###### Index Signature

\[`k`: `string`\]: `object`

A string identifier to associate with the input. The value of \<input_id\> is a map of the input's metadata. The \<input_id\> must be a unique identifier within the inputs object. The \<input_id\> must start with a letter or _ and contain only alphanumeric characters, -, or _.

This interface was referenced by `undefined`'s JSON-Schema definition
via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".

##### workflow\_call.outputs?

> `optional` **outputs**: `object`

When using the workflow_call keyword, you can optionally specify inputs that are passed to the called workflow from the caller workflow.

###### Index Signature

\[`k`: `string`\]: `object`

A string identifier to associate with the output. The value of \<output_id\> is a map of the output's metadata. The \<output_id\> must be a unique identifier within the outputs object. The \<output_id\> must start with a letter or _ and contain only alphanumeric characters, -, or _.

This interface was referenced by `undefined`'s JSON-Schema definition
via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".

##### workflow\_call.secrets?

> `optional` **secrets**: `object`

A map of the secrets that can be used in the called workflow. Within the called workflow, you can use the secrets context to refer to a secret.

###### Index Signature

\[`k`: `string`\]: `object`

A string identifier to associate with the secret.

This interface was referenced by `undefined`'s JSON-Schema definition
via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".

#### workflow\_dispatch?

> `optional` **workflow\_dispatch**: `object`

You can now create workflows that are manually triggered with the new workflow_dispatch event. You will then see a 'Run workflow' button on the Actions tab, enabling you to easily trigger a run.

##### workflow\_dispatch.inputs?

> `optional` **inputs**: `object`

Input parameters allow you to specify data that the action expects to use during runtime. GitHub stores input parameters as environment variables. Input ids with uppercase letters are converted to lowercase during runtime. We recommended using lowercase input ids.

###### Index Signature

\[`k`: `string`\]: [`WorkflowDispatchInput`](../type-aliases/WorkflowDispatchInput.md)

#### workflow\_run?

> `optional` **workflow\_run**: WorkflowRunEvent \| undefined

***

### permissions?

> `optional` **permissions**: [`Permissions`](../type-aliases/Permissions.md)

Defined in: [types/githubActionsWorkflow.ts:746](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L746)

***

### run-name?

> `optional` **run-name**: `string`

Defined in: [types/githubActionsWorkflow.ts:745](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L745)

The name for workflow runs generated from the workflow. GitHub displays the workflow run name in the list of workflow runs on your repository's 'Actions' tab.
