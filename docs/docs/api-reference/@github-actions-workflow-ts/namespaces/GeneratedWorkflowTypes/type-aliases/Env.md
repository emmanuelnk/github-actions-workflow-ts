[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Env

# Type Alias: Env

> **Env** = `object` & \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \} \| [`StringContainingExpressionSyntax`](StringContainingExpressionSyntax.md)

Defined in: [types/githubActionsWorkflow.ts:615](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L615)

A map of the input parameters defined by the action. Each input parameter is a key/value pair. Input parameters are set as environment variables. The variable is prefixed with INPUT_ and converted to upper case.

## Type Declaration

### args?

> `optional` **args**: `string`

### entrypoint?

> `optional` **entrypoint**: `string`
