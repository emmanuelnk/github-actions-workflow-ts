import type { DiagnosticsReporter } from './diagnostics'

export interface Context {
  diagnostics: DiagnosticsReporter
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
