[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / DiagnosticRuleConfig

# Type Alias: DiagnosticRuleConfig

> **DiagnosticRuleConfig** = [`ConfiguredSeverity`](ConfiguredSeverity.md) \| \{ `exclude?`: `string`[]; `severity?`: [`ConfiguredSeverity`](ConfiguredSeverity.md); \}

Defined in: [types/diagnostics.ts:27](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eb791f98a5c7871cf5c52fc4e1567bf9fe1afcd1/packages/lib/src/types/diagnostics.ts#L27)

Configuration for a diagnostic rule.
Can be a simple severity string or an object with more options.
