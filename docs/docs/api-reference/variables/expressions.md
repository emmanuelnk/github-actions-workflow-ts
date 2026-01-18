[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / expressions

# Variable: expressions

> `const` **expressions**: `object`

Defined in: [utils/index.ts:4](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/utils/index.ts#L4)

Utility methods to generate specific Github Actions workflow expressions.

## Type Declaration

### env()

> **env**(`envName`): `string`

Generates an environment variable expression
i.e. `${{ env.<envName> }}`

Ref: https://docs.github.com/en/actions/learn-github-actions/expressions

#### Parameters

##### envName

`string`

The name of the environment variable.

#### Returns

`string`

The formatted environment variable reference.

### expn()

> **expn**(`expression`): `string`

Wraps the provided expression inside a special format understood by Github Actions
i.e. `${{ <expression> }}`

Ref: https://docs.github.com/en/actions/learn-github-actions/expressions

#### Parameters

##### expression

`string`

The raw expression to wrap.

#### Returns

`string`

The wrapped expression.

### secret()

> **secret**(`secretName`): `string`

Generates a secrets expression
i.e. `${{ secrets.<secretName> }}`

Ref: https://docs.github.com/en/actions/learn-github-actions/expressions

#### Parameters

##### secretName

`string`

The name of the secret.

#### Returns

`string`

The formatted secret reference.

### ternary()

> **ternary**(`condition`, `ifTrue`, `ifFalse`): `string`

Generates a YAML compatible ternary operation
i.e. `${{ <condition> && <ifTrue> || <ifFalse> }}`

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

### var()

> **var**(`varName`): `string`

Generates a variables expression
i.e. `${{ vars.<varName> }}`

Ref: https://docs.github.com/en/actions/learn-github-actions/expressions

#### Parameters

##### varName

`string`

The name of the variable.

#### Returns

`string`

The formatted variable reference.
