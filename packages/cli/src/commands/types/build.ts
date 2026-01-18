/**
 * Severity level for diagnostic rules.
 * - 'off': Suppress the diagnostic entirely
 * - 'warn': Emit as a warning (default behavior)
 * - 'error': Upgrade to an error
 */
export type DiagnosticSeverity = 'off' | 'warn' | 'error'

/**
 * Configuration for a diagnostic rule.
 * Can be a simple severity string or an object with more options.
 */
export type DiagnosticRuleConfig =
  | DiagnosticSeverity
  | {
      /** The severity level for this diagnostic */
      severity?: DiagnosticSeverity
      /** Action patterns to exclude from this rule (e.g., "actions/checkout@*") */
      exclude?: string[]
    }

/**
 * Diagnostics configuration section of wac.config.json
 */
export type DiagnosticsConfig = {
  /**
   * Rules for specific diagnostic codes.
   * Keys are diagnostic codes like 'action-version-unverifiable' or 'action-version-semver-violation'.
   */
  rules?: Record<string, DiagnosticRuleConfig>
}

export type WacConfig = {
  refs?: boolean
  headerText?: string[]
  dumpOptions?: Record<string, unknown>
  /**
   * Configuration for diagnostics/warnings emitted during build.
   */
  diagnostics?: DiagnosticsConfig
}
