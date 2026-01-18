[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Snapshot

# Type Alias: Snapshot

> **Snapshot** = `string` \| \{ `image-name`: `string`; `version?`: `string`; \}

Defined in: [types/githubActionsWorkflow.ts:502](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L502)

You can use `jobs.&lt;job_id&gt;.snapshot` to generate a custom image.
Add the snapshot keyword to the job, using either the string syntax or mapping syntax as shown in https://docs.github.com/en/actions/how-tos/manage-runners/larger-runners/use-custom-images#generating-a-custom-image.
Each job that includes the snapshot keyword creates a separate image. To generate only one image or image version, include all workflow steps in a single job. Each successful run of a job that includes the snapshot keyword creates a new version of that image.
For more information, see https://docs.github.com/en/actions/how-tos/manage-runners/larger-runners/use-custom-images.
