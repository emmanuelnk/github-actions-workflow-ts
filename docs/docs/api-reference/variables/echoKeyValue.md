[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / echoKeyValue

# Variable: echoKeyValue

> `const` **echoKeyValue**: `object`

Defined in: [utils/index.ts:74](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/utils/index.ts#L74)

Utility methods to echo key-value pairs to various targets.

## Type Declaration

### to()

> **to**(`key`, `value`, `to`): `string`

Outputs a key-value pair to a specified target.

#### Parameters

##### key

`string`

The key to output.

##### value

`string`

The value corresponding to the key.

##### to

`string`

The target to output to.

#### Returns

`string`

The command string to output the key-value pair.

### toGithubEnv()

> **toGithubEnv**(`key`, `value`): `string`

Outputs a key-value pair to the GitHub Actions workflow environment.
i.e. `echo "KEY=VALUE" >> $GITHUB_ENV`

#### Parameters

##### key

`string`

The key to output.

##### value

`string`

The value corresponding to the key.

#### Returns

`string`

The command string to output the key-value pair to GitHub Actions workflow environment.

### toGithubOutput()

> **toGithubOutput**(`key`, `value`): `string`

Outputs a key-value pair to the GitHub Actions workflow output.
i.e. `echo "KEY=VALUE" >> $GITHUB_OUTPUT`

#### Parameters

##### key

`string`

The key to output.

##### value

`string`

The value corresponding to the key.

#### Returns

`string`

The command string to output the key-value pair to GitHub output.
