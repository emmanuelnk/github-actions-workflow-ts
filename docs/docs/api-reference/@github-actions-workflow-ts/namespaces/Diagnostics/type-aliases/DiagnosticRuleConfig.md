[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / DiagnosticRuleConfig

# Type Alias: DiagnosticRuleConfig

> **DiagnosticRuleConfig** = [`ConfiguredSeverity`](ConfiguredSeverity.md) \| \{ `exclude?`: `string`[]; `severity?`: [`ConfiguredSeverity`](ConfiguredSeverity.md); \}

Defined in: [types/diagnostics.ts:27](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/diagnostics.ts#L27)

Configuration for a diagnostic rule.
Can be a simple severity string or an object with more options.
