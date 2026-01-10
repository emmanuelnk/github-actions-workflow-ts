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

export interface Diagnostic {
  severity: DiagnosticSeverity
  code: string
  message: string
  stack?: string
  cause?: Error
}

export interface DiagnosticsReporter {
  emit(d: Diagnostic): void
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
