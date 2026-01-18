/* eslint-disable no-console */
import { Diagnostics, Context } from '@github-actions-workflow-ts/lib'

export class ConsoleDiagnosticsReporter
  implements Diagnostics.DiagnosticsReporter
{
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
    const severity = effectiveSeverity

    let message = `[github-actions-workflow-ts] ${severity}: ${d.message} (${d.code})`
    if (d.stack) {
      message += `\n${d.stack}`
    }
    if (d.cause) {
      message += `\n[cause]: ${d.cause}`
    }
    console.error(message)
  }
}
