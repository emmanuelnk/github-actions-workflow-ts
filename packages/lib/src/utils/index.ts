/**
 * Utility methods to generate specific Github Actions workflow expressions.
 */
export const expressions = {
  /**
   * Wraps the provided expression inside a special format understood by Github Actions
   * i.e. `${{ <expression> }}`
   *
   * Ref: https://docs.github.com/en/actions/learn-github-actions/expressions
   *
   * @param {string} expression - The raw expression to wrap.
   * @returns {string} The wrapped expression.
   */
  expn(expression: string): string {
    return `\${{ ${expression} }}`
  },

  /**
   * Generates an environment variable expression
   * i.e. `${{ env.<envName> }}`
   *
   * Ref: https://docs.github.com/en/actions/learn-github-actions/expressions
   *
   * @param {string} envName - The name of the environment variable.
   * @returns {string} The formatted environment variable reference.
   */
  env(envName: string): string {
    return this.expn(`env.${envName}`)
  },

  /**
   * Generates a secrets expression
   * i.e. `${{ secrets.<secretName> }}`
   *
   * Ref: https://docs.github.com/en/actions/learn-github-actions/expressions
   *
   * @param {string} secretName - The name of the secret.
   * @returns {string} The formatted secret reference.
   */
  secret(secretName: string): string {
    return this.expn(`secrets.${secretName}`)
  },

  /**
   * Generates a variables expression
   * i.e. `${{ vars.<varName> }}`
   *
   * Ref: https://docs.github.com/en/actions/learn-github-actions/expressions
   *
   * @param {string} varName - The name of the variable.
   * @returns {string} The formatted variable reference.
   */
  var(varName: string): string {
    return this.expn(`vars.${varName}`)
  },

  /**
   * Generates a YAML compatible ternary operation
   * i.e. `${{ <condition> && <ifTrue> || <ifFalse> }}`
   *
   * @param {string} condition - The condition to evaluate.
   * @param {string} ifTrue - The value to return if the condition is true.
   * @param {string} ifFalse - The value to return if the condition is false.
   * @returns {string} The formatted ternary operation.
   */
  ternary(condition: string, ifTrue: string, ifFalse: string): string {
    return `\${{ ${condition} && ${ifTrue} || ${ifFalse} }}`
  },
}

/**
 * Utility methods to echo key-value pairs to various targets.
 */
export const echoKeyValue = {
  /**
   * Outputs a key-value pair to a specified target.
   *
   * @param {string} key - The key to output.
   * @param {string} value - The value corresponding to the key.
   * @param {string} to - The target to output to.
   * @returns {string} The command string to output the key-value pair.
   */
  to(key: string, value: string, to: string): string {
    return `echo "${key}=${value}" >> ${to}`
  },

  /**
   * Outputs a key-value pair to the GitHub Actions workflow environment.
   * i.e. `echo "KEY=VALUE" >> $GITHUB_ENV`
   *
   * @param {string} key - The key to output.
   * @param {string} value - The value corresponding to the key.
   * @returns {string} The command string to output the key-value pair to GitHub Actions workflow environment.
   */
  toGithubEnv(key: string, value: string): string {
    return `echo "${key}=${value}" >> $GITHUB_ENV`
  },

  /**
   * Outputs a key-value pair to the GitHub Actions workflow output.
   * i.e. `echo "KEY=VALUE" >> $GITHUB_OUTPUT`
   *
   * @param {string} key - The key to output.
   * @param {string} value - The value corresponding to the key.
   * @returns {string} The command string to output the key-value pair to GitHub output.
   */
  toGithubOutput(key: string, value: string): string {
    return `echo "${key}=${value}" >> $GITHUB_OUTPUT`
  },
}

/**
 * Escapes special characters in a string (used by multilineString and dedentString).
 * Converts control characters and backslashes to their escaped representations.
 */
const escapeSpecialChars = (str: string): string => {
  return str.replace(/[\b\f\n\r\t\v\0\\]/g, (match: string): string => {
    return {
      '\b': '\\b',
      '\f': '\\f',
      '\n': '\\n',
      '\r': '\\r',
      '\t': '\\t',
      '\v': '\\v',
      '\0': '\\0',
      '\\': '\\\\',
    }[match] as string
  })
}

/**
 * Joins multiple strings with newline characters to create a multi-line YAML string.
 *
 * @param {...string[]} strings - An array of strings to join.
 * @returns {string} A multi-line YAML string.
 *
 * @example
 * ```yaml
 *  some-field: >-
 *   This is the first line in a multi-line YAML string.
 *
 *   This is the second line.
 * ```
 */
export const multilineString = (...strings: string[]): string => {
  return strings.map((str) => escapeSpecialChars(str)).join('\n')
}

/**
 * Strips leading whitespace from a template literal string while preserving relative indentation.
 * Useful for writing inline multi-line strings (like scripts) that render cleanly in YAML.
 *
 * Note: Unlike multilineString, this function does NOT escape special characters.
 * Use literal backslashes (\\n, \\t) in your template if you need them in the output.
 *
 * @param {string} str - The template literal string to dedent.
 * @returns {string} The dedented string with common leading whitespace removed.
 *
 * @example
 * ```typescript
 * const script = dedentString(`
 *   github.rest.issues.createComment({
 *     issue_number: context.issue.number,
 *     owner: context.repo.owner,
 *     repo: context.repo.repo,
 *     body: '✅ Build succeeded!'
 *   })
 * `)
 * // Results in:
 * // github.rest.issues.createComment({
 * //   issue_number: context.issue.number,
 * //   owner: context.repo.owner,
 * //   repo: context.repo.repo,
 * //   body: '✅ Build succeeded!'
 * // })
 * ```
 */
export const dedentString = (str: string): string => {
  // Split into lines
  const lines = str.split('\n')

  // Remove first line if empty (common with template literals)
  if (lines[0].trim() === '') {
    lines.shift()
  }

  // Remove last line if empty
  if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop()
  }

  // Find minimum indentation (ignoring empty lines)
  const minIndent = lines
    .filter((line) => line.trim().length > 0)
    .reduce((min, line) => {
      const match = line.match(/^(\s*)/)
      const indent = match ? match[1].length : 0
      return Math.min(min, indent)
    }, Infinity)

  // Remove the common indentation from all lines
  if (minIndent === Infinity || minIndent === 0) {
    return lines.join('\n')
  }

  return lines.map((line) => line.slice(minIndent)).join('\n')
}

/**
 * Utility methods related to GitHub workflow operations.
 */
export const workflowOps = {
  /**
   * @deprecated since version 0.2.0 use `expressions.ternary` instead.
   *
   * Generates a YAML compatible ternary operation
   * i.e. `${{ <condition> && <ifTrue> || <ifFalse> }}`
   *
   * @param {string} condition - The condition to evaluate.
   * @param {string} ifTrue - The value to return if the condition is true.
   * @param {string} ifFalse - The value to return if the condition is false.
   * @returns {string} The formatted ternary operation.
   */
  ternary(condition: string, ifTrue: string, ifFalse: string): string {
    return `\${{ ${condition} && ${ifTrue} || ${ifFalse} }}`
  },
}
