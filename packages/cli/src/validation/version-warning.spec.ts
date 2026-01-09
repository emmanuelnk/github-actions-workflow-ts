import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals'
import {
  parseVersion,
  compareSemver,
  extractVersionFromUses,
  isSemverLike,
  isMajorOnly,
  validateActionVersion,
  logVersionWarnings,
  getActionPattern,
  type VersionWarning,
} from './version-warning.js'

describe('version-warning', () => {
  describe('parseVersion', () => {
    it('should parse full semver with v prefix', () => {
      expect(parseVersion('v1.2.3')).toEqual({ major: 1, minor: 2, patch: 3 })
    })

    it('should parse full semver without v prefix', () => {
      expect(parseVersion('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3 })
    })

    it('should parse major.minor version', () => {
      expect(parseVersion('v1.2')).toEqual({ major: 1, minor: 2, patch: 0 })
    })

    it('should parse major-only version', () => {
      expect(parseVersion('v1')).toEqual({ major: 1, minor: 0, patch: 0 })
    })

    it('should return null for non-semver strings', () => {
      expect(parseVersion('main')).toBeNull()
      expect(parseVersion('abc123')).toBeNull()
      expect(parseVersion('feature/branch')).toBeNull()
    })

    it('should return null for empty string', () => {
      expect(parseVersion('')).toBeNull()
    })
  })

  describe('compareSemver', () => {
    it('should return positive when a > b (major)', () => {
      expect(
        compareSemver(
          { major: 2, minor: 0, patch: 0 },
          { major: 1, minor: 0, patch: 0 },
        ),
      ).toBeGreaterThan(0)
    })

    it('should return positive when a > b (minor)', () => {
      expect(
        compareSemver(
          { major: 1, minor: 2, patch: 0 },
          { major: 1, minor: 1, patch: 0 },
        ),
      ).toBeGreaterThan(0)
    })

    it('should return positive when a > b (patch)', () => {
      expect(
        compareSemver(
          { major: 1, minor: 1, patch: 2 },
          { major: 1, minor: 1, patch: 1 },
        ),
      ).toBeGreaterThan(0)
    })

    it('should return negative when a < b', () => {
      expect(
        compareSemver(
          { major: 1, minor: 0, patch: 0 },
          { major: 2, minor: 0, patch: 0 },
        ),
      ).toBeLessThan(0)
    })

    it('should return 0 when equal', () => {
      expect(
        compareSemver(
          { major: 1, minor: 2, patch: 3 },
          { major: 1, minor: 2, patch: 3 },
        ),
      ).toBe(0)
    })
  })

  describe('extractVersionFromUses', () => {
    it('should extract version from uses string', () => {
      expect(extractVersionFromUses('actions/checkout@v4')).toBe('v4')
      expect(extractVersionFromUses('actions/checkout@v4.1.2')).toBe('v4.1.2')
    })

    it('should extract commit SHA from uses string', () => {
      expect(extractVersionFromUses('actions/checkout@abc123def')).toBe(
        'abc123def',
      )
    })

    it('should extract branch name from uses string', () => {
      expect(extractVersionFromUses('actions/checkout@main')).toBe('main')
    })

    it('should return null for invalid uses string', () => {
      expect(extractVersionFromUses('invalid')).toBeNull()
    })
  })

  describe('isSemverLike', () => {
    it('should return true for semver-like strings', () => {
      expect(isSemverLike('v1')).toBe(true)
      expect(isSemverLike('v1.2')).toBe(true)
      expect(isSemverLike('v1.2.3')).toBe(true)
      expect(isSemverLike('1.2.3')).toBe(true)
    })

    it('should return false for non-semver strings', () => {
      expect(isSemverLike('main')).toBe(false)
      expect(isSemverLike('abc123')).toBe(false)
      expect(isSemverLike('feature/branch')).toBe(false)
    })
  })

  describe('isMajorOnly', () => {
    it('should return true for major-only versions', () => {
      expect(isMajorOnly('v4')).toBe(true)
      expect(isMajorOnly('4')).toBe(true)
      expect(isMajorOnly('v12')).toBe(true)
    })

    it('should return false for versions with minor or patch', () => {
      expect(isMajorOnly('v4.1')).toBe(false)
      expect(isMajorOnly('v4.0.0')).toBe(false)
      expect(isMajorOnly('4.1.2')).toBe(false)
    })

    it('should return false for non-semver strings', () => {
      expect(isMajorOnly('main')).toBe(false)
      expect(isMajorOnly('abc123')).toBe(false)
    })
  })

  describe('validateActionVersion', () => {
    it('should return null for matching major versions', () => {
      const result = validateActionVersion('actions/checkout@v4', 'v4.1.0')
      expect(result).toBeNull()
    })

    it('should return null when pinned version equals or is newer than source', () => {
      expect(
        validateActionVersion('actions/checkout@v4.1.0', 'v4.1.0'),
      ).toBeNull()
      expect(
        validateActionVersion('actions/checkout@v4.2.0', 'v4.1.0'),
      ).toBeNull()
    })

    it('should return warning for older pinned version', () => {
      const result = validateActionVersion('actions/checkout@v4.0.0', 'v4.1.0')
      expect(result).not.toBeNull()
      expect(result?.type).toBe('older-version')
      expect(result?.usedVersion).toBe('v4.0.0')
      expect(result?.sourceVersion).toBe('v4.1.0')
    })

    it('should return warning for non-semver ref', () => {
      const result = validateActionVersion('actions/checkout@abc123', 'v4.1.0')
      expect(result).not.toBeNull()
      expect(result?.type).toBe('non-semver-ref')
      expect(result?.usedVersion).toBe('abc123')
    })

    it('should return warning for branch name ref', () => {
      const result = validateActionVersion('actions/checkout@main', 'v4.1.0')
      expect(result).not.toBeNull()
      expect(result?.type).toBe('non-semver-ref')
    })

    it('should return warning for different major version', () => {
      const result = validateActionVersion('actions/checkout@v3.0.0', 'v4.1.0')
      expect(result).not.toBeNull()
      expect(result?.type).toBe('older-version')
    })
  })

  describe('logVersionWarnings', () => {
    let consoleLogSpy: jest.SpiedFunction<typeof console.log>

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      consoleLogSpy.mockRestore()
    })

    it('should not log anything if no warnings', () => {
      logVersionWarnings([])
      expect(consoleLogSpy).not.toHaveBeenCalled()
    })

    it('should log warnings when present', () => {
      const warnings: VersionWarning[] = [
        {
          uses: 'actions/checkout@v4.0.0',
          usedVersion: 'v4.0.0',
          sourceVersion: 'v4.1.0',
          message: 'Test warning message',
          type: 'older-version',
        },
      ]

      logVersionWarnings(warnings)

      expect(consoleLogSpy).toHaveBeenCalled()
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Version warnings'),
      )
    })
  })

  describe('getActionPattern', () => {
    it('should return major version pattern for semver', () => {
      expect(getActionPattern('actions/checkout@v4.1.2')).toBe(
        'actions/checkout@v4',
      )
      expect(getActionPattern('actions/checkout@v4.0.0')).toBe(
        'actions/checkout@v4',
      )
    })

    it('should return same pattern for major-only version', () => {
      expect(getActionPattern('actions/checkout@v4')).toBe(
        'actions/checkout@v4',
      )
    })

    it('should return original for non-semver refs', () => {
      expect(getActionPattern('actions/checkout@main')).toBe(
        'actions/checkout@main',
      )
      expect(getActionPattern('actions/checkout@abc123')).toBe(
        'actions/checkout@abc123',
      )
    })

    it('should return original for invalid format', () => {
      expect(getActionPattern('invalid')).toBe('invalid')
    })
  })
})
