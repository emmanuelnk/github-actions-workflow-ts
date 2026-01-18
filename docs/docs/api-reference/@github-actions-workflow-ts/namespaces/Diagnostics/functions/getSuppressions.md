[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / getSuppressions

# Function: getSuppressions()

> **getSuppressions**&lt;`T`&gt;(`val`): `object`[] \| `undefined`

Defined in: [types/diagnostics.ts:205](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/diagnostics.ts#L205)

Gets suppression metadata from a value, if present.
Returns undefined if the value is not suppressed.

## Type Parameters

### T

`T`

## Parameters

### val

`T` | [`SuppressedValue`](../interfaces/SuppressedValue.md)&lt;`T`&gt;

## Returns

`object`[] \| `undefined`
