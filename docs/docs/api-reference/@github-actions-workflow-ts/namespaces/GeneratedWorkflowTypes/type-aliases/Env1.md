[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Env1

# Type Alias: Env1

> **Env1** = \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \} \| [`StringContainingExpressionSyntax`](StringContainingExpressionSyntax.md)

Defined in: [types/githubActionsWorkflow.ts:513](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/githubActionsWorkflow.ts#L513)

To set custom environment variables, you need to specify the variables in the workflow file. You can define environment variables for a step, job, or entire workflow using the jobs.\<job_id\>.steps[*].env, jobs.\<job_id\>.env, and env keywords. For more information, see https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsenv
