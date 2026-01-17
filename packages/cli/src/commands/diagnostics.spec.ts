import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals'
import { ConsoleDiagnosticsReporter } from './diagnostics.js'
import { Diagnostics } from '@github-actions-workflow-ts/lib'

describe('ConsoleDiagnosticsReporter', () => {
  let consoleSpy: {
    log: jest.SpiedFunction<typeof console.log>
    error: jest.SpiedFunction<typeof console.error>
  }

  beforeEach(() => {
    consoleSpy = {
      log: jest.spyOn(console, 'log').mockImplementation(() => {}),
      error: jest.spyOn(console, 'error').mockImplementation(() => {}),
    }
  })

  afterEach(() => {
    consoleSpy.log.mockRestore()
    consoleSpy.error.mockRestore()
  })

  it('should implement DiagnosticsReporter interface', () => {
    const reporter = new ConsoleDiagnosticsReporter()

    expect(typeof reporter.emit).toBe('function')
  })

  it('should log the diagnostic object to console.log', () => {
    const reporter = new ConsoleDiagnosticsReporter()
    const diagnostic: Diagnostics.Diagnostic = {
      severity: Diagnostics.DiagnosticSeverity.WARN,
      code: 'test-code',
      message: 'Test message',
    }

    reporter.emit(diagnostic)

    expect(consoleSpy.log).toHaveBeenCalledWith(diagnostic)
  })

  it('should format and log message to console.error', () => {
    const reporter = new ConsoleDiagnosticsReporter()
    const diagnostic: Diagnostics.Diagnostic = {
      severity: Diagnostics.DiagnosticSeverity.ERROR,
      code: 'error-code',
      message: 'Something went wrong',
    }

    reporter.emit(diagnostic)

    expect(consoleSpy.error).toHaveBeenCalledWith(
      '[github-actions-workflow-ts] error: Something went wrong (error-code)',
    )
  })

  it('should include stack trace in output when present', () => {
    const reporter = new ConsoleDiagnosticsReporter()
    const diagnostic: Diagnostics.Diagnostic = {
      severity: Diagnostics.DiagnosticSeverity.WARN,
      code: 'stack-code',
      message: 'Warning with stack',
      stack:
        '    at someFunction (file.ts:10:5)\n    at anotherFunction (file.ts:20:3)',
    }

    reporter.emit(diagnostic)

    expect(consoleSpy.error).toHaveBeenCalledWith(
      expect.stringContaining('Warning with stack'),
    )
    expect(consoleSpy.error).toHaveBeenCalledWith(
      expect.stringContaining('at someFunction'),
    )
  })

  it('should include cause in output when present', () => {
    const reporter = new ConsoleDiagnosticsReporter()
    const cause = new Error('Root cause error')
    const diagnostic: Diagnostics.Diagnostic = {
      severity: Diagnostics.DiagnosticSeverity.FATAL,
      code: 'cause-code',
      message: 'Fatal error occurred',
      cause,
    }

    reporter.emit(diagnostic)

    expect(consoleSpy.error).toHaveBeenCalledWith(
      expect.stringContaining('[cause]:'),
    )
  })

  it('should handle diagnostic with both stack and cause', () => {
    const reporter = new ConsoleDiagnosticsReporter()
    const cause = new Error('Underlying issue')
    const diagnostic: Diagnostics.Diagnostic = {
      severity: Diagnostics.DiagnosticSeverity.ERROR,
      code: 'full-diagnostic',
      message: 'Complete error',
      stack: '    at test (test.ts:1:1)',
      cause,
    }

    reporter.emit(diagnostic)

    const errorCall = consoleSpy.error.mock.calls[0][0] as string
    expect(errorCall).toContain('Complete error')
    expect(errorCall).toContain('at test')
    expect(errorCall).toContain('[cause]:')
  })

  it('should work with all severity levels', () => {
    const reporter = new ConsoleDiagnosticsReporter()
    const severities = [
      Diagnostics.DiagnosticSeverity.TRACE,
      Diagnostics.DiagnosticSeverity.DEBUG,
      Diagnostics.DiagnosticSeverity.INFO,
      Diagnostics.DiagnosticSeverity.WARN,
      Diagnostics.DiagnosticSeverity.ERROR,
      Diagnostics.DiagnosticSeverity.FATAL,
    ]

    for (const severity of severities) {
      consoleSpy.error.mockClear()

      reporter.emit({
        severity,
        code: 'test',
        message: 'test message',
      })

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringContaining(`${severity}:`),
      )
    }
  })
})
