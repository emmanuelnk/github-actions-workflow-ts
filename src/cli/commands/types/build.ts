export type WacConfig = {
  /** if true, convert duplicate objects into references (default: false) */
  refs?: boolean
  /**
   * An array of string to override the default text that appears at the top of
   * the generated workflow files. This is useful for adding comments to the
   * generated workflow files.
   */
  headerText?: string[]
  /**
   * Options for js-yaml dump funtion
   * Ref: https://github.com/nodeca/js-yaml#dump-object---options-
   */
  dumpOptions?: Record<string, unknown>
}
