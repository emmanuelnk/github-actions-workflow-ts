import type { DiagnosticsReporter, DiagnosticRules } from './diagnostics'

export interface Context {
  diagnostics: DiagnosticsReporter
  /** Configured diagnostic rules from wac.config.json */
  diagnosticRules?: DiagnosticRules
}

const wacContextSymbol = Symbol.for('[wac-context]')

type GlobalThisWithContext = typeof globalThis & {
  [wacContextSymbol]?: Context
}

const _globalThis = globalThis as GlobalThisWithContext

/** @private */
export function __internalSetGlobalContext(c: Context) {
  _globalThis[wacContextSymbol] = c
}

export function getGlobalWacContext() {
  return _globalThis[wacContextSymbol]
}
