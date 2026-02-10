/* eslint-disable no-console */
import { Diagnostics, Context } from '@github-actions-workflow-ts/lib'

export const DiagnosticSeverityAnsi: Record<
  Diagnostics.DiagnosticSeverity,
  string
> = {
  trace: '\x1b[90m', // bright black / gray
  debug: '\x1b[36m', // cyan
  info: '\x1b[32m', // green
  warning: '\x1b[33m', // yellow
  error: '\x1b[31m', // red
  fatal: '\x1b[35m', // magenta
} as const

export const ANSI_RESET = '\x1b[0m'

type ConsoleDiagnosticsReporterOptions = {
  /**
   * Enables or disables color. When set to "auto", diagnostic logs will be
   * colored only when running in an interactive terminal.
   *
   * @default "auto"
   */
  color?: boolean | 'auto'
}

export class ConsoleDiagnosticsReporter
  implements Diagnostics.DiagnosticsReporter
{
  constructor(private options: ConsoleDiagnosticsReporterOptions = {}) {}

  emit(d: Diagnostics.Diagnostic): void {
    // Get diagnostic rules from context
    const rules = Context.getGlobalWacContext()?.diagnosticRules

    // Determine effective severity based on rules
    const effectiveSeverity = Diagnostics.getEffectiveSeverity(d, rules)

    // If suppressed, don't emit
    if (effectiveSeverity === 'off') {
      return
    }

    // Use the effective severity (may have been upgraded/downgraded)
    const severity = this.formatSeverity(effectiveSeverity)

    let message = `[github-actions-workflow-ts] ${severity}: ${d.message} (${d.code})`
    if (d.stack) {
      message += `\n${d.stack}`
    }
    if (d.cause) {
      message += `\n[cause]: ${d.cause}`
    }
    console.error(message)
  }

  private formatSeverity(severity: Diagnostics.DiagnosticSeverity) {
    if (!this.shouldUseColor()) {
      return severity
    }

    const color = DiagnosticSeverityAnsi[severity]

    if (typeof color !== 'string') {
      return severity
    }

    return `${color}${severity}${ANSI_RESET}`
  }

  private shouldUseColor() {
    const color = this.options.color ?? 'auto'

    if (color === 'auto') {
      return Boolean(process.stdout.isTTY)
    }

    return color
  }
}
