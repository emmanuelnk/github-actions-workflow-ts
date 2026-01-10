/* eslint-disable no-console */
import { Diagnostics } from '@github-actions-workflow-ts/lib'

export class ConsoleDiagnosticsReporter
  implements Diagnostics.DiagnosticsReporter
{
  emit(d: Diagnostics.Diagnostic): void {
    console.log(d)
    let message = `[github-actions-workflow-ts] ${d.severity}: ${d.message} (${d.code})`
    if (d.stack) {
      message += `\n${d.stack}`
    }
    if (d.cause) {
      message += `\n[cause]: ${d.cause}`
    }
    console.error(message)
  }
}
