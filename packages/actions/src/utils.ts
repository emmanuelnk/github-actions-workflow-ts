export interface PartialSemver {
  major: number
  minor: number | undefined
  patch: number | undefined
  prerelease?: string | undefined
  buildmeta?: string | undefined
}

export interface Semver {
  major: number
  minor: number
  patch: number
  prerelease: string | undefined
  buildmeta: string | undefined
}

/**
 * Accepts a partial or full semver and returns true if it is a full semver
 */
export function isFullSemver(semver: PartialSemver): semver is Semver {
  return semver.minor !== undefined && semver.patch !== undefined
}

/**
 * Checks if a semver version is compatible with the provided required version.
 * If the actual version is less than the required version, false is returned.
 * If the actual version has a higher major version than the required version, false is returned.
 * Otherwise, true is returned.
 */
export function isCompatibleVersion(
  required: Semver,
  actual: PartialSemver,
): boolean {
  if (required.major !== actual.major) return false
  if (actual.minor === undefined) return true
  if (required.minor !== actual.minor) return actual.minor > required.minor
  if (actual.major === undefined) return true
  return actual.major >= required.major
}

/**
 * Parse a partial semantic version string into its components
 * Returns null if the version doesn't match semver-like patterns
 */
export function parsePartialVersion(version: string): PartialSemver | null {
  // Match patterns like v1, v1.0, v1.0.0, 1, 1.0, 1.0.0
  // Adapted from https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
  const match = version.match(
    /^v?(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
  )
  if (!match) return null

  return {
    major: parseInt(match[1]),
    minor: match[2] !== undefined ? parseInt(match[2]) : undefined,
    patch: match[3] !== undefined ? parseInt(match[3]) : undefined,
    prerelease: match[4],
    buildmeta: match[5],
  }
}
