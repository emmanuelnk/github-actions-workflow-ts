/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export const DiagnosticSeverity = {
  TRACE: 'trace' as const,
  DEBUG: 'debug' as const,
  INFO: 'info' as const,
  WARN: 'warning' as const,
  ERROR: 'error' as const,
  FATAL: 'fatal' as const,
}

export type DiagnosticSeverity =
  (typeof DiagnosticSeverity)[keyof typeof DiagnosticSeverity]

/**
 * Configured severity level for diagnostic rules.
 * - 'off': Suppress the diagnostic entirely
 * - 'warn': Emit as a warning (default behavior)
 * - 'error': Upgrade to an error
 */
export type ConfiguredSeverity = 'off' | 'warn' | 'error'

/**
 * Configuration for a diagnostic rule.
 * Can be a simple severity string or an object with more options.
 */
export type DiagnosticRuleConfig =
  | ConfiguredSeverity
  | {
      severity?: ConfiguredSeverity
      exclude?: string[]
    }

/**
 * Map of diagnostic codes to their rule configurations.
 */
export type DiagnosticRules = Record<string, DiagnosticRuleConfig>

export interface Diagnostic {
  /**
   * The severity of the diagnostic event.
   */
  severity: DiagnosticSeverity
  /**
   * The unique code for the diagnostic rule. This should be a unique kebab-case
   * string. It will be displayed to the user alongside the diagnostic message,
   * and can be used by end users to override the severity of the diagnostic
   * event.
   *
   * @example "my-custom-diagnostic-code"
   */
  code: string
  /**
   * A short message explaining the error.
   */
  message: string
  /**
   * The stack trace for the diagnostic event. This can be produced using the
   * `Diagnostics.generateStackTrace` helper:
   *
   * ```ts
   * import { Diagnostics } from '@github-actions-workflow-ts/lib'
   *
   * export class MyCustomAction {
   *   constructor(...) {
   *     Diagnostics.generateStackTrace(this.constructor)
   *   }
   * }
   * ```
   *
   * Note that `Diagnostics.generateStackTrace` accepts an optional function
   * argument. If provided, the top frame of the stack trace will be the call
   * site of that function.
   */
  stack?: string
  /**
   * An optional cause for the diagnostic event. If provided, the default
   * diagnostics reporter implementation will log this below the diagnostic
   * message.
   */
  cause?: Error
  /**
   * Optional action identifier for pattern matching (e.g., "actions/checkout@v4").
   *
   * End users may specify an exclude pattern for a diagnostic code. This is
   * checked against the diagnostics "action" property, and if it matches, the
   * diagnostic will be supressed.
   *
   * This value should be provided if the diagnostic event relates to a specific
   * action. Otherwise, it can be omitted.
   */
  action?: string
}

export interface DiagnosticsReporter {
  emit(d: Diagnostic): void
}

/**
 * Checks if an action string matches a pattern.
 * Supports wildcard (*) at the end of patterns.
 * @example
 * matchesActionPattern('actions/checkout@v4', 'actions/checkout@*') // true
 * matchesActionPattern('actions/checkout@v4', 'actions/checkout@v4') // true
 * matchesActionPattern('actions/checkout@v4', 'actions/setup-node@*') // false
 */
export function matchesActionPattern(action: string, pattern: string): boolean {
  if (pattern.endsWith('*')) {
    const prefix = pattern.slice(0, -1)
    return action.startsWith(prefix)
  }
  return action === pattern
}

/**
 * Determines the effective severity for a diagnostic based on configured rules.
 * Returns the severity to use, or 'off' if the diagnostic should be suppressed.
 */
export function getEffectiveSeverity(
  diagnostic: Diagnostic,
  rules: DiagnosticRules | undefined,
): DiagnosticSeverity | 'off' {
  if (!rules) {
    return diagnostic.severity
  }

  const rule = rules[diagnostic.code]
  if (!rule) {
    return diagnostic.severity
  }

  // Simple string rule
  if (typeof rule === 'string') {
    if (rule === 'off') return 'off'
    if (rule === 'error') return DiagnosticSeverity.ERROR
    if (rule === 'warn') return DiagnosticSeverity.WARN
    return diagnostic.severity
  }

  // Object rule with potential exclusions
  const { severity, exclude } = rule

  // Check if this action is excluded from the rule
  if (exclude && diagnostic.action) {
    const isExcluded = exclude.some((pattern) =>
      matchesActionPattern(diagnostic.action!, pattern),
    )
    if (isExcluded) {
      return 'off'
    }
  }

  // Apply severity override
  if (severity === 'off') return 'off'
  if (severity === 'error') return DiagnosticSeverity.ERROR
  if (severity === 'warn') return DiagnosticSeverity.WARN

  return diagnostic.severity
}

export function generateStackTrace(
  constructorOpt?: Function | undefined,
): string {
  const targetObject = { name: '', stack: '' }
  Error.captureStackTrace(targetObject, constructorOpt)
  const lines = targetObject.stack.split('\n')
  const indexOfModuleJobRun = lines.findIndex((line) =>
    line.includes('at ModuleJob.run'),
  )
  return lines.slice(1, indexOfModuleJobRun).join('\n')
}

/**
 * Symbol used to identify suppressed values.
 */
const SUPPRESSED_VALUE_SYMBOL = Symbol.for('[wac-suppressed-value]')

/**
 * A value wrapped with diagnostic suppression metadata.
 * Created by the `suppress()` function.
 */
export interface SuppressedValue<T> {
  [SUPPRESSED_VALUE_SYMBOL]: true
  value: T
  suppressions: Array<{ code: string; reason?: string }>
}

/**
 * Wraps a value with diagnostic suppression metadata.
 * Use this to suppress specific warnings for a value in-code.
 *
 * @param value - The value to wrap
 * @param codes - Diagnostic code(s) to suppress (e.g., 'action-version-semver-violation')
 * @param reason - Optional reason for suppression (for documentation purposes)
 * @returns A wrapped value with suppression metadata
 *
 * @example
 * ```typescript
 * import { Diagnostics } from '@github-actions-workflow-ts/lib'
 *
 * new ActionsCheckoutV4({
 *   uses: Diagnostics.suppress(
 *     'actions/checkout@v3',
 *     'action-version-semver-violation',
 *     'Using v3 for legacy compatibility'
 *   ),
 * })
 * ```
 */
export function suppress<T>(
  value: T,
  codes: string | string[],
  reason?: string,
): SuppressedValue<T> {
  const codeArray = Array.isArray(codes) ? codes : [codes]
  return {
    [SUPPRESSED_VALUE_SYMBOL]: true,
    value,
    suppressions: codeArray.map((code) => ({ code, reason })),
  }
}

/**
 * Type guard to check if a value is a SuppressedValue.
 */
export function isSuppressedValue<T>(
  val: T | SuppressedValue<T>,
): val is SuppressedValue<T> {
  return (
    typeof val === 'object' &&
    val !== null &&
    SUPPRESSED_VALUE_SYMBOL in val &&
    (val as SuppressedValue<T>)[SUPPRESSED_VALUE_SYMBOL] === true
  )
}

/**
 * Unwraps a potentially suppressed value, returning the underlying value.
 */
export function unwrapValue<T>(val: T | SuppressedValue<T>): T {
  if (isSuppressedValue(val)) {
    return val.value
  }
  return val
}

/**
 * Gets suppression metadata from a value, if present.
 * Returns undefined if the value is not suppressed.
 */
export function getSuppressions<T>(
  val: T | SuppressedValue<T>,
): Array<{ code: string; reason?: string }> | undefined {
  if (isSuppressedValue(val)) {
    return val.suppressions
  }
  return undefined
}

/**
 * Checks if a diagnostic code is suppressed for a given value.
 */
export function isCodeSuppressed<T>(
  val: T | SuppressedValue<T>,
  code: string,
): boolean {
  const suppressions = getSuppressions(val)
  if (!suppressions) {
    return false
  }
  return suppressions.some((s) => s.code === code)
}
