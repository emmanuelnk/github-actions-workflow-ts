[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / getEffectiveSeverity

# Function: getEffectiveSeverity()

> **getEffectiveSeverity**(`diagnostic`, `rules`): [`DiagnosticSeverity`](../type-aliases/DiagnosticSeverity.md) \| `"off"`

Defined in: [types/diagnostics.ts:73](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/diagnostics.ts#L73)

Determines the effective severity for a diagnostic based on configured rules.
Returns the severity to use, or 'off' if the diagnostic should be suppressed.

## Parameters

### diagnostic

[`Diagnostic`](../interfaces/Diagnostic.md)

### rules

[`DiagnosticRules`](../type-aliases/DiagnosticRules.md) | `undefined`

## Returns

[`DiagnosticSeverity`](../type-aliases/DiagnosticSeverity.md) \| `"off"`
