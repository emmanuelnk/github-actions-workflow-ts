/**
 * Severity level for diagnostic rules.
 * - 'off': Suppress the diagnostic entirely
 * - 'warn': Emit as a warning (default behavior)
 * - 'error': Upgrade to an error
 */
export type DiagnosticSeverity = 'off' | 'warn' | 'error'

/**
 * Configuration for a diagnostic rule.
 * Can be a simple severity string or an object with more options.
 */
export type DiagnosticRuleConfig =
  | DiagnosticSeverity
  | {
      /** The severity level for this diagnostic */
      severity?: DiagnosticSeverity
      /** Action patterns to exclude from this rule (e.g., "actions/checkout@*") */
      exclude?: string[]
    }

/**
 * Diagnostics configuration section of wac.config.json
 */
export type DiagnosticsConfig = {
  /**
   * Rules for specific diagnostic codes.
   * Keys are diagnostic codes like 'action-version-unverifiable' or 'action-version-semver-violation'.
   */
  rules?: Record<string, DiagnosticRuleConfig>
}

/**
 * Override rule for output paths.
 * Allows specifying custom output directories for specific workflow files.
 */
export type OutputPathOverride = {
  /**
   * Pattern to match against workflow source files.
   * Supports both filename patterns and full path patterns.
   * Examples:
   * - Filename: "app-a-deploy.wac.ts", "*-release.wac.ts"
   * - Full path: "packages/app-a/**.wac.ts", "src/workflows/*.wac.ts"
   */
  match: string
  /**
   * Output directory path for matching workflow files.
   * Can be relative or absolute.
   */
  path: string
}

/**
 * Configuration for custom output paths.
 * Allows workflows to be written to different directories.
 */
export type OutputPathsConfig = {
  /**
   * Configuration for workflow file output paths.
   */
  workflows?: {
    /**
     * Default output directory for workflow files.
     * Defaults to ".github/workflows" if not specified.
     */
    default?: string
    /**
     * Override rules for specific workflow files.
     * Checked in order; first match wins.
     */
    overrides?: OutputPathOverride[]
  }
}

export type WacConfig = {
  refs?: boolean
  headerText?: string[]
  dumpOptions?: Record<string, unknown>
  /**
   * Configuration for diagnostics/warnings emitted during build.
   */
  diagnostics?: DiagnosticsConfig
  /**
   * Configuration for custom output paths.
   * Allows workflows to be written to different directories based on filename patterns.
   */
  outputPaths?: OutputPathsConfig
  /**
   * Root directory for resolving output paths.
   * If not specified, automatically detected by finding the nearest .git directory
   * or package.json with workspaces.
   *
   * This is useful when running gwf from a subdirectory (e.g., scripts/) but
   * wanting output paths to be relative to the project root.
   *
   * @example "../../" - Go up two directories from cwd
   * @example "/absolute/path/to/project" - Use an absolute path
   */
  rootDir?: string
}

export function defineConfig(config: WacConfig): WacConfig {
  return config
}
