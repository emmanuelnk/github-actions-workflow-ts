[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [Diagnostics](../README.md) / DiagnosticRuleConfig

# Type Alias: DiagnosticRuleConfig

> **DiagnosticRuleConfig** = [`ConfiguredSeverity`](ConfiguredSeverity.md) \| \{ `exclude?`: `string`[]; `severity?`: [`ConfiguredSeverity`](ConfiguredSeverity.md); \}

Defined in: [types/diagnostics.ts:27](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/diagnostics.ts#L27)

Configuration for a diagnostic rule.
Can be a simple severity string or an object with more options.
