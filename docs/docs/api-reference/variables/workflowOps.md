[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / workflowOps

# Variable: workflowOps

> `const` **workflowOps**: `object`

Defined in: [utils/index.ts:212](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/utils/index.ts#L212)

Utility methods related to GitHub workflow operations.

## Type Declaration

### ~~ternary()~~

> **ternary**(`condition`, `ifTrue`, `ifFalse`): `string`

#### Parameters

##### condition

`string`

The condition to evaluate.

##### ifTrue

`string`

The value to return if the condition is true.

##### ifFalse

`string`

The value to return if the condition is false.

#### Returns

`string`

The formatted ternary operation.

#### Deprecated

since version 0.2.0 use `expressions.ternary` instead.

Generates a YAML compatible ternary operation
i.e. `${{ &lt;condition&gt; && &lt;ifTrue&gt; || &lt;ifFalse&gt; }}`
