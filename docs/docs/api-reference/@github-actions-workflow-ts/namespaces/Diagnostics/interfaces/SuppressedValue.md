[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / SuppressedValue

# Interface: SuppressedValue&lt;T&gt;

Defined in: [types/diagnostics.ts:136](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/diagnostics.ts#L136)

A value wrapped with diagnostic suppression metadata.
Created by the `suppress()` function.

## Type Parameters

### T

`T`

## Properties

### \[SUPPRESSED\_VALUE\_SYMBOL\]

> **\[SUPPRESSED\_VALUE\_SYMBOL\]**: `true`

Defined in: [types/diagnostics.ts:137](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/diagnostics.ts#L137)

***

### suppressions

> **suppressions**: `object`[]

Defined in: [types/diagnostics.ts:139](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/diagnostics.ts#L139)

#### code

> **code**: `string`

#### reason?

> `optional` **reason**: `string`

***

### value

> **value**: `T`

Defined in: [types/diagnostics.ts:138](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/diagnostics.ts#L138)
