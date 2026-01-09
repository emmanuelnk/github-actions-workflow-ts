/* eslint-disable no-console */

/**
 * Parse a semver-like version string into its components.
 * Returns null if the version doesn't match semver patterns.
 */
export function parseVersion(
  version: string,
): { major: number; minor: number; patch: number } | null {
  // Match patterns like v1, v1.0, v1.0.0, 1, 1.0, 1.0.0
  const match = version.match(/^v?(\d+)(?:\.(\d+))?(?:\.(\d+))?$/)
  if (!match) return null

  return {
    major: parseInt(match[1], 10),
    minor: match[2] !== undefined ? parseInt(match[2], 10) : 0,
    patch: match[3] !== undefined ? parseInt(match[3], 10) : 0,
  }
}

/**
 * Compare two semver versions.
 * Returns: positive if a > b, negative if a < b, 0 if equal
 */
export function compareSemver(
  a: { major: number; minor: number; patch: number },
  b: { major: number; minor: number; patch: number },
): number {
  if (a.major !== b.major) return a.major - b.major
  if (a.minor !== b.minor) return a.minor - b.minor
  return a.patch - b.patch
}

/**
 * Extract the version part from a uses string.
 * e.g., "actions/checkout@v6.0.1" -> "v6.0.1"
 *       "actions/checkout@abc123" -> "abc123"
 */
export function extractVersionFromUses(uses: string): string | null {
  const match = uses.match(/@(.+)$/)
  return match ? match[1] : null
}

/**
 * Check if a version string looks like a semver (vX, vX.Y, or vX.Y.Z).
 */
export function isSemverLike(version: string): boolean {
  return parseVersion(version) !== null
}

/**
 * Result of version validation.
 */
export interface VersionWarning {
  uses: string
  usedVersion: string
  sourceVersion: string
  message: string
  type: 'older-version' | 'non-semver-ref'
}

/**
 * Check if a version string is a major-only version (e.g., "v4" not "v4.1.0").
 */
export function isMajorOnly(version: string): boolean {
  // Match patterns like v1 or 1 (without minor/patch)
  return /^v?\d+$/.test(version)
}

/**
 * Validate a uses string against a source version.
 * Returns a warning object if there's a potential issue, null otherwise.
 */
export function validateActionVersion(
  uses: string,
  sourceVersion: string,
): VersionWarning | null {
  const usedVersion = extractVersionFromUses(uses)
  if (!usedVersion) return null

  // Check if used version is semver-like
  const usedParsed = parseVersion(usedVersion)

  if (!usedParsed) {
    // Non-semver ref (commit SHA, branch name, etc.)
    return {
      uses,
      usedVersion,
      sourceVersion,
      message: `Using non-semver ref "${usedVersion}". Types were generated from ${sourceVersion} and may not match.`,
      type: 'non-semver-ref',
    }
  }

  // Compare with source version
  const sourceParsed = parseVersion(sourceVersion)
  if (!sourceParsed) return null

  // If using major-only version (e.g., @v4), it resolves to latest, so no warning needed
  // as long as it's the same major version
  if (isMajorOnly(usedVersion) && usedParsed.major === sourceParsed.major) {
    return null
  }

  // Only compare if same major version
  if (usedParsed.major !== sourceParsed.major) {
    // Different major version - types were generated for a different major
    return {
      uses,
      usedVersion,
      sourceVersion,
      message: `Using ${usedVersion} but types were generated from ${sourceVersion} (different major version). Types may not match.`,
      type: 'older-version',
    }
  }

  // Check if used version is older than source
  if (compareSemver(usedParsed, sourceParsed) < 0) {
    return {
      uses,
      usedVersion,
      sourceVersion,
      message: `Pinned to ${usedVersion} which is older than ${sourceVersion} (types source). Some inputs/outputs may not exist in ${usedVersion}.`,
      type: 'older-version',
    }
  }

  return null
}

/**
 * Log version warnings to console, deduplicating by uses string.
 */
export function logVersionWarnings(warnings: VersionWarning[]): void {
  if (warnings.length === 0) return

  // Deduplicate warnings by uses string
  const uniqueWarnings = new Map<string, VersionWarning>()
  for (const warning of warnings) {
    if (!uniqueWarnings.has(warning.uses)) {
      uniqueWarnings.set(warning.uses, warning)
    }
  }

  console.log('\n[github-actions-workflow-ts] ⚠️  Version warnings detected:')

  for (const warning of uniqueWarnings.values()) {
    console.log(`  • ${warning.uses}: ${warning.message}`)
  }

  console.log(
    '  To suppress these warnings, set "actionsPackageOutdatedVersionWarnings": false in wac.config.json\n',
  )
}

/**
 * Known action source versions registry.
 * Maps action patterns to their source versions.
 * This is populated by importing from @github-actions-workflow-ts/actions.
 */
export type ActionVersionRegistry = Map<string, string>

/**
 * Create an action pattern from owner/repo for lookup.
 * e.g., "actions/checkout@v6" -> "actions/checkout@v6"
 */
export function getActionPattern(uses: string): string {
  // Extract owner/repo@version pattern
  const match = uses.match(/^([^@]+)@(.+)$/)
  if (!match) return uses

  const [, actionPath, version] = match
  const versionParsed = parseVersion(version)

  if (versionParsed) {
    // For semver, match against major version pattern
    return `${actionPath}@v${versionParsed.major}`
  }

  // For non-semver, return as-is (won't match registry)
  return uses
}
