[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / WorkflowOptions

# Type Alias: WorkflowOptions

> **WorkflowOptions** = `object`

Defined in: [workflow/index.ts:7](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/workflow/index.ts#L7)

Options for configuring a Workflow instance.

## Properties

### outputPath?

> `optional` **outputPath?**: `string`

Defined in: [workflow/index.ts:14](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/workflow/index.ts#L14)

Custom output path for this workflow.
If specified, takes precedence over config file settings.
Can be a relative or absolute path to the output directory.

#### Example

```ts
"packages/app-a/.github/workflows"
```
