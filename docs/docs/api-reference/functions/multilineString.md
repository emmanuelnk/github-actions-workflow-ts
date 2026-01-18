[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / multilineString

# Function: multilineString()

> **multilineString**(...`strings`): `string`

Defined in: [utils/index.ts:145](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/utils/index.ts#L145)

Joins multiple strings with newline characters to create a multi-line YAML string.

## Parameters

### strings

...`string`[]

An array of strings to join.

## Returns

`string`

A multi-line YAML string.

## Example

```yaml
 some-field: >-
  This is the first line in a multi-line YAML string.

  This is the second line.
```
