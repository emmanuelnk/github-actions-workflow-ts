[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / matchesActionPattern

# Function: matchesActionPattern()

> **matchesActionPattern**(`action`, `pattern`): `boolean`

Defined in: [types/diagnostics.ts:61](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/diagnostics.ts#L61)

Checks if an action string matches a pattern.
Supports wildcard (*) at the end of patterns.

## Parameters

### action

`string`

### pattern

`string`

## Returns

`boolean`

## Example

```ts
matchesActionPattern('actions/checkout@v4', 'actions/checkout@*') // true
matchesActionPattern('actions/checkout@v4', 'actions/checkout@v4') // true
matchesActionPattern('actions/checkout@v4', 'actions/setup-node@*') // false
```
