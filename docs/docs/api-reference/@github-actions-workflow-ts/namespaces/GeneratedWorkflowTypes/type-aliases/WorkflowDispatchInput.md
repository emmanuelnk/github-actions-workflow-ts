[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / WorkflowDispatchInput

# Type Alias: WorkflowDispatchInput

> **WorkflowDispatchInput** = `object` & `object`

Defined in: [types/githubActionsWorkflow.ts:459](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L459)

A string identifier to associate with the input. The value of \<input_id\> is a map of the input's metadata. The \<input_id\> must be a unique identifier within the inputs object. The \<input_id\> must start with a letter or _ and contain only alphanumeric characters, -, or _.

This interface was referenced by `undefined`'s JSON-Schema definition
via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".

## Type Declaration

### default?

> `optional` **default?**: `string` \| `number` \| `boolean`

A string representing the default value. The default value is used when an input parameter isn't specified in a workflow file.

### deprecationMessage?

> `optional` **deprecationMessage?**: `string`

A string shown to users using the deprecated input.

### description?

> `optional` **description?**: `string`

A string description of the input parameter.

### options?

> `optional` **options?**: \[`string`, `...string[]`\]

The options of the dropdown list, if the type is a choice.

### required?

> `optional` **required?**: `boolean`

A boolean to indicate whether the action requires the input parameter. Set to true when the parameter is required.

### type?

> `optional` **type?**: `"string"` \| `"choice"` \| `"boolean"` \| `"number"` \| `"environment"`

A string representing the type of the input.
