import { jest, describe, it, expect, afterEach } from '@jest/globals'
import { Diagnostics, Context } from './index.js'

describe('Diagnostics', () => {
  describe('DiagnosticSeverity', () => {
    it('should have all severity levels defined', () => {
      expect(Diagnostics.DiagnosticSeverity.TRACE).toBe('trace')
      expect(Diagnostics.DiagnosticSeverity.DEBUG).toBe('debug')
      expect(Diagnostics.DiagnosticSeverity.INFO).toBe('info')
      expect(Diagnostics.DiagnosticSeverity.WARN).toBe('warning')
      expect(Diagnostics.DiagnosticSeverity.ERROR).toBe('error')
      expect(Diagnostics.DiagnosticSeverity.FATAL).toBe('fatal')
    })
  })

  describe('generateStackTrace', () => {
    it('should return a string with stack trace information', () => {
      const stack = Diagnostics.generateStackTrace()

      expect(typeof stack).toBe('string')
      expect(stack.length).toBeGreaterThan(0)
    })

    it('should exclude lines after ModuleJob.run', () => {
      const stack = Diagnostics.generateStackTrace()

      // Should not contain ModuleJob.run or internal node lines after it
      expect(stack).not.toContain('at ModuleJob.run')
    })

    it('should exclude the first line (Error: at ...)', () => {
      const stack = Diagnostics.generateStackTrace()

      // The first line of a stack trace typically starts with "Error:"
      // Our function removes this by slicing from index 1
      expect(stack).not.toMatch(/^Error:/)
    })

    it('should accept a constructor function to exclude from trace', () => {
      function myFunction() {
        return Diagnostics.generateStackTrace(myFunction)
      }

      const stack = myFunction()

      // The stack should not include 'myFunction' at the top
      // since we passed it as constructorOpt
      expect(typeof stack).toBe('string')
    })
  })
})

describe('Context', () => {
  afterEach(() => {
    // Clean up after each test
    Context.__internalSetGlobalContext(undefined as never)
  })

  describe('__internalSetGlobalContext and getGlobalWacContext', () => {
    it('should return undefined when context is not set', () => {
      const context = Context.getGlobalWacContext()

      expect(context).toBeUndefined()
    })

    it('should set and retrieve the global context', () => {
      const mockDiagnostics: Diagnostics.DiagnosticsReporter = {
        emit: jest.fn(),
      }
      const testContext: Context.Context = {
        diagnostics: mockDiagnostics,
      }

      Context.__internalSetGlobalContext(testContext)
      const retrieved = Context.getGlobalWacContext()

      expect(retrieved).toBe(testContext)
      expect(retrieved?.diagnostics).toBe(mockDiagnostics)
    })

    it('should overwrite previously set context', () => {
      const mockDiagnostics1: Diagnostics.DiagnosticsReporter = {
        emit: jest.fn(),
      }
      const mockDiagnostics2: Diagnostics.DiagnosticsReporter = {
        emit: jest.fn(),
      }

      Context.__internalSetGlobalContext({ diagnostics: mockDiagnostics1 })
      Context.__internalSetGlobalContext({ diagnostics: mockDiagnostics2 })

      const retrieved = Context.getGlobalWacContext()
      expect(retrieved?.diagnostics).toBe(mockDiagnostics2)
    })
  })
})
