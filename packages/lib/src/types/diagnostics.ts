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
  severity: DiagnosticSeverity
  code: string
  message: string
  stack?: string
  cause?: Error
  /** Optional action identifier for pattern matching (e.g., "actions/checkout@v4") */
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
