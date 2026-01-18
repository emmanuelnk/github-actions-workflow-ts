[**@github-actions-workflow-ts/lib**](../README.md)

***

[@github-actions-workflow-ts/lib](../README.md) / dedentString

# Function: dedentString()

> **dedentString**(`str`): `string`

Defined in: [utils/index.ts:178](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/utils/index.ts#L178)

Strips leading whitespace from a template literal string while preserving relative indentation.
Useful for writing inline multi-line strings (like scripts) that render cleanly in YAML.

Note: Unlike multilineString, this function does NOT escape special characters.
Use literal backslashes (\\n, \\t) in your template if you need them in the output.

## Parameters

### str

`string`

The template literal string to dedent.

## Returns

`string`

The dedented string with common leading whitespace removed.

## Example

```typescript
const script = dedentString(`
  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: '✅ Build succeeded!'
  })
`)
// Results in:
// github.rest.issues.createComment({
//   issue_number: context.issue.number,
//   owner: context.repo.owner,
//   repo: context.repo.repo,
//   body: '✅ Build succeeded!'
// })
```
