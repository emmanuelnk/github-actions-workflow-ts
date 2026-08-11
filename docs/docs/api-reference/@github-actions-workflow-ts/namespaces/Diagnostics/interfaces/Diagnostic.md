[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / Diagnostic

# Interface: Diagnostic

Defined in: [types/diagnostics.ts:39](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/diagnostics.ts#L39)

## Properties

### action?

> `optional` **action?**: `string`

Defined in: [types/diagnostics.ts:92](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/diagnostics.ts#L92)

Optional action identifier for pattern matching (e.g., "actions/checkout@v4").

End users may specify an exclude pattern for a diagnostic code. This is
checked against the diagnostics "action" property, and if it matches, the
diagnostic will be supressed.

This value should be provided if the diagnostic event relates to a specific
action. Otherwise, it can be omitted.

***

### cause?

> `optional` **cause?**: `Error`

Defined in: [types/diagnostics.ts:81](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/diagnostics.ts#L81)

An optional cause for the diagnostic event. If provided, the default
diagnostics reporter implementation will log this below the diagnostic
message.

***

### code

> **code**: `string`

Defined in: [types/diagnostics.ts:52](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/diagnostics.ts#L52)

The unique code for the diagnostic rule. This should be a unique kebab-case
string. It will be displayed to the user alongside the diagnostic message,
and can be used by end users to override the severity of the diagnostic
event.

#### Example

```ts
"my-custom-diagnostic-code"
```

***

### message

> **message**: `string`

Defined in: [types/diagnostics.ts:56](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/diagnostics.ts#L56)

A short message explaining the error.

***

### severity

> **severity**: [`DiagnosticSeverity`](../type-aliases/DiagnosticSeverity.md)

Defined in: [types/diagnostics.ts:43](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/diagnostics.ts#L43)

The severity of the diagnostic event.

***

### stack?

> `optional` **stack?**: `string`

Defined in: [types/diagnostics.ts:75](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/diagnostics.ts#L75)

The stack trace for the diagnostic event. This can be produced using the
`Diagnostics.generateStackTrace` helper:

```ts
import { Diagnostics } from '@github-actions-workflow-ts/lib'

export class MyCustomAction {
  constructor(...) {
    Diagnostics.generateStackTrace(this.constructor)
  }
}
```

Note that `Diagnostics.generateStackTrace` accepts an optional function
argument. If provided, the top frame of the stack trace will be the call
site of that function.
