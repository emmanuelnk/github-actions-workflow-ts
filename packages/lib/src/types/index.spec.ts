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

  describe('matchesActionPattern', () => {
    it('should match exact action strings', () => {
      expect(
        Diagnostics.matchesActionPattern(
          'actions/checkout@v4',
          'actions/checkout@v4',
        ),
      ).toBe(true)
    })

    it('should not match different action strings', () => {
      expect(
        Diagnostics.matchesActionPattern(
          'actions/checkout@v4',
          'actions/setup-node@v4',
        ),
      ).toBe(false)
    })

    it('should match wildcard patterns at end', () => {
      expect(
        Diagnostics.matchesActionPattern(
          'actions/checkout@v4',
          'actions/checkout@*',
        ),
      ).toBe(true)
      expect(
        Diagnostics.matchesActionPattern(
          'actions/checkout@v4.0.0',
          'actions/checkout@*',
        ),
      ).toBe(true)
    })

    it('should not match wildcard patterns for different actions', () => {
      expect(
        Diagnostics.matchesActionPattern(
          'actions/setup-node@v4',
          'actions/checkout@*',
        ),
      ).toBe(false)
    })

    it('should match wildcard for entire repo', () => {
      expect(
        Diagnostics.matchesActionPattern('actions/checkout@v4', 'actions/*'),
      ).toBe(true)
    })
  })

  describe('getEffectiveSeverity', () => {
    const baseDiagnostic: Diagnostics.Diagnostic = {
      severity: Diagnostics.DiagnosticSeverity.WARN,
      code: 'test-code',
      message: 'Test message',
    }

    it('should return original severity when no rules provided', () => {
      expect(Diagnostics.getEffectiveSeverity(baseDiagnostic, undefined)).toBe(
        Diagnostics.DiagnosticSeverity.WARN,
      )
    })

    it('should return original severity when no matching rule', () => {
      const rules: Diagnostics.DiagnosticRules = {
        'other-code': 'off',
      }
      expect(Diagnostics.getEffectiveSeverity(baseDiagnostic, rules)).toBe(
        Diagnostics.DiagnosticSeverity.WARN,
      )
    })

    it('should return off when rule is off (string)', () => {
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': 'off',
      }
      expect(Diagnostics.getEffectiveSeverity(baseDiagnostic, rules)).toBe(
        'off',
      )
    })

    it('should upgrade to error when rule is error (string)', () => {
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': 'error',
      }
      expect(Diagnostics.getEffectiveSeverity(baseDiagnostic, rules)).toBe(
        Diagnostics.DiagnosticSeverity.ERROR,
      )
    })

    it('should keep as warn when rule is warn (string)', () => {
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': 'warn',
      }
      expect(Diagnostics.getEffectiveSeverity(baseDiagnostic, rules)).toBe(
        Diagnostics.DiagnosticSeverity.WARN,
      )
    })

    it('should return off when rule object has severity off', () => {
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': { severity: 'off' },
      }
      expect(Diagnostics.getEffectiveSeverity(baseDiagnostic, rules)).toBe(
        'off',
      )
    })

    it('should upgrade to error when rule object has severity error', () => {
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': { severity: 'error' },
      }
      expect(Diagnostics.getEffectiveSeverity(baseDiagnostic, rules)).toBe(
        Diagnostics.DiagnosticSeverity.ERROR,
      )
    })

    it('should suppress when action matches exclude pattern', () => {
      const diagnostic: Diagnostics.Diagnostic = {
        ...baseDiagnostic,
        action: 'actions/checkout@v4',
      }
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': { exclude: ['actions/checkout@*'] },
      }
      expect(Diagnostics.getEffectiveSeverity(diagnostic, rules)).toBe('off')
    })

    it('should not suppress when action does not match exclude pattern', () => {
      const diagnostic: Diagnostics.Diagnostic = {
        ...baseDiagnostic,
        action: 'actions/setup-node@v4',
      }
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': { exclude: ['actions/checkout@*'] },
      }
      expect(Diagnostics.getEffectiveSeverity(diagnostic, rules)).toBe(
        Diagnostics.DiagnosticSeverity.WARN,
      )
    })

    it('should apply severity when action is not in exclude list', () => {
      const diagnostic: Diagnostics.Diagnostic = {
        ...baseDiagnostic,
        action: 'actions/setup-node@v4',
      }
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': { severity: 'error', exclude: ['actions/checkout@*'] },
      }
      expect(Diagnostics.getEffectiveSeverity(diagnostic, rules)).toBe(
        Diagnostics.DiagnosticSeverity.ERROR,
      )
    })

    it('should ignore exclude when diagnostic has no action', () => {
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': { severity: 'error', exclude: ['actions/checkout@*'] },
      }
      expect(Diagnostics.getEffectiveSeverity(baseDiagnostic, rules)).toBe(
        Diagnostics.DiagnosticSeverity.ERROR,
      )
    })

    it('should support multiple exclude patterns', () => {
      const diagnostic: Diagnostics.Diagnostic = {
        ...baseDiagnostic,
        action: 'actions/setup-node@v4',
      }
      const rules: Diagnostics.DiagnosticRules = {
        'test-code': {
          exclude: ['actions/checkout@*', 'actions/setup-node@*'],
        },
      }
      expect(Diagnostics.getEffectiveSeverity(diagnostic, rules)).toBe('off')
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

  describe('suppress', () => {
    it('should wrap a value with suppression metadata (single code)', () => {
      const result = Diagnostics.suppress('test-value', 'test-code')

      expect(Diagnostics.isSuppressedValue(result)).toBe(true)
      expect(result.value).toBe('test-value')
      expect(result.suppressions).toEqual([{ code: 'test-code' }])
    })

    it('should wrap a value with suppression metadata (multiple codes)', () => {
      const result = Diagnostics.suppress('test-value', ['code-1', 'code-2'])

      expect(result.suppressions).toEqual([
        { code: 'code-1' },
        { code: 'code-2' },
      ])
    })

    it('should include reason when provided', () => {
      const result = Diagnostics.suppress(
        'test-value',
        'test-code',
        'Using old version for compatibility',
      )

      expect(result.suppressions).toEqual([
        { code: 'test-code', reason: 'Using old version for compatibility' },
      ])
    })

    it('should include same reason for all codes', () => {
      const result = Diagnostics.suppress(
        'test-value',
        ['code-1', 'code-2'],
        'Legacy support',
      )

      expect(result.suppressions).toEqual([
        { code: 'code-1', reason: 'Legacy support' },
        { code: 'code-2', reason: 'Legacy support' },
      ])
    })
  })

  describe('isSuppressedValue', () => {
    it('should return true for suppressed values', () => {
      const suppressed = Diagnostics.suppress('value', 'code')

      expect(Diagnostics.isSuppressedValue(suppressed)).toBe(true)
    })

    it('should return false for regular values', () => {
      expect(Diagnostics.isSuppressedValue('string')).toBe(false)
      expect(Diagnostics.isSuppressedValue(123)).toBe(false)
      expect(Diagnostics.isSuppressedValue(null)).toBe(false)
      expect(Diagnostics.isSuppressedValue(undefined)).toBe(false)
      expect(Diagnostics.isSuppressedValue({ value: 'test' })).toBe(false)
    })
  })

  describe('unwrapValue', () => {
    it('should return the inner value for suppressed values', () => {
      const suppressed = Diagnostics.suppress('test-value', 'code')

      expect(Diagnostics.unwrapValue(suppressed)).toBe('test-value')
    })

    it('should return the value as-is for non-suppressed values', () => {
      expect(Diagnostics.unwrapValue('plain-string')).toBe('plain-string')
      expect(Diagnostics.unwrapValue(42)).toBe(42)
    })
  })

  describe('getSuppressions', () => {
    it('should return suppressions for suppressed values', () => {
      const suppressed = Diagnostics.suppress('value', ['code-1', 'code-2'])

      expect(Diagnostics.getSuppressions(suppressed)).toEqual([
        { code: 'code-1' },
        { code: 'code-2' },
      ])
    })

    it('should return undefined for non-suppressed values', () => {
      expect(Diagnostics.getSuppressions('plain-value')).toBeUndefined()
    })
  })

  describe('isCodeSuppressed', () => {
    it('should return true when code is in suppressions', () => {
      const suppressed = Diagnostics.suppress('value', ['code-1', 'code-2'])

      expect(Diagnostics.isCodeSuppressed(suppressed, 'code-1')).toBe(true)
      expect(Diagnostics.isCodeSuppressed(suppressed, 'code-2')).toBe(true)
    })

    it('should return false when code is not in suppressions', () => {
      const suppressed = Diagnostics.suppress('value', 'code-1')

      expect(Diagnostics.isCodeSuppressed(suppressed, 'other-code')).toBe(false)
    })

    it('should return false for non-suppressed values', () => {
      expect(Diagnostics.isCodeSuppressed('value', 'any-code')).toBe(false)
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
