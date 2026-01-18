[**@github-actions-workflow-ts/lib**](../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../README.md) / Diagnostics

# Diagnostics

Diagnostics utilities for validating workflows and reporting issues.
Includes severity levels, rule configurations, and suppression handling.

## Interfaces

| Interface | Description |
| ------ | ------ |
| [Diagnostic](interfaces/Diagnostic.md) | - |
| [DiagnosticsReporter](interfaces/DiagnosticsReporter.md) | - |
| [SuppressedValue](interfaces/SuppressedValue.md) | A value wrapped with diagnostic suppression metadata. Created by the `suppress()` function. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [ConfiguredSeverity](type-aliases/ConfiguredSeverity.md) | Configured severity level for diagnostic rules. - 'off': Suppress the diagnostic entirely - 'warn': Emit as a warning (default behavior) - 'error': Upgrade to an error |
| [DiagnosticRuleConfig](type-aliases/DiagnosticRuleConfig.md) | Configuration for a diagnostic rule. Can be a simple severity string or an object with more options. |
| [DiagnosticRules](type-aliases/DiagnosticRules.md) | Map of diagnostic codes to their rule configurations. |
| [DiagnosticSeverity](type-aliases/DiagnosticSeverity.md) | - |

## Variables

| Variable | Description |
| ------ | ------ |
| [DiagnosticSeverity](variables/DiagnosticSeverity.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [generateStackTrace](functions/generateStackTrace.md) | - |
| [getEffectiveSeverity](functions/getEffectiveSeverity.md) | Determines the effective severity for a diagnostic based on configured rules. Returns the severity to use, or 'off' if the diagnostic should be suppressed. |
| [getSuppressions](functions/getSuppressions.md) | Gets suppression metadata from a value, if present. Returns undefined if the value is not suppressed. |
| [isCodeSuppressed](functions/isCodeSuppressed.md) | Checks if a diagnostic code is suppressed for a given value. |
| [isSuppressedValue](functions/isSuppressedValue.md) | Type guard to check if a value is a SuppressedValue. |
| [matchesActionPattern](functions/matchesActionPattern.md) | Checks if an action string matches a pattern. Supports wildcard (*) at the end of patterns. |
| [suppress](functions/suppress.md) | Wraps a value with diagnostic suppression metadata. Use this to suppress specific warnings for a value in-code. |
| [unwrapValue](functions/unwrapValue.md) | Unwraps a potentially suppressed value, returning the underlying value. |
