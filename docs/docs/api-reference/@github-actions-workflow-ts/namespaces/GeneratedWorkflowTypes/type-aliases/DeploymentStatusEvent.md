[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / DeploymentStatusEvent

# Type Alias: DeploymentStatusEvent

> **DeploymentStatusEvent** = \{\[`k`: `string`\]: `unknown`; \} \| `null`

Defined in: [types/githubActionsWorkflow.ts:108](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L108)

Runs your workflow anytime a third party provides a deployment status, which triggers the deployment_status event. Deployments created with a commit SHA may not have a Git ref. For information about the REST API, see https://developer.github.com/v3/repos/deployments/#create-a-deployment-status.
