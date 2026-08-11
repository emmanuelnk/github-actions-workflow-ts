[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / SuppressedValue

# Interface: SuppressedValue&lt;T&gt;

Defined in: [types/diagnostics.ts:184](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/diagnostics.ts#L184)

A value wrapped with diagnostic suppression metadata.
Created by the `suppress()` function.

## Type Parameters

### T

`T`

## Properties

### \[SUPPRESSED\_VALUE\_SYMBOL\]

> **\[SUPPRESSED\_VALUE\_SYMBOL\]**: `true`

Defined in: [types/diagnostics.ts:185](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/diagnostics.ts#L185)

***

### suppressions

> **suppressions**: `object`[]

Defined in: [types/diagnostics.ts:187](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/diagnostics.ts#L187)

#### code

> **code**: `string`

#### reason?

> `optional` **reason?**: `string`

***

### value

> **value**: `T`

Defined in: [types/diagnostics.ts:186](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/diagnostics.ts#L186)
