export type WacConfig = {
  refs?: boolean
  headerText?: string[]
  dumpOptions?: Record<string, unknown>
  /**
   * Enable/disable version mismatch warnings for actions package.
   * When true (default), warns when:
   * - A pinned version is older than the version types were generated from
   * - A non-semver ref (commit SHA, branch) is used
   * Set to false to suppress these warnings.
   */
  actionsPackageOutdatedVersionWarnings?: boolean
}
