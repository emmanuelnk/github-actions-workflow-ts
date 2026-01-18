[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / workflowOps

# Variable: workflowOps

> `const` **workflowOps**: `object`

Defined in: [utils/index.ts:212](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/utils/index.ts#L212)

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
i.e. `${{ <condition> && <ifTrue> || <ifFalse> }}`
