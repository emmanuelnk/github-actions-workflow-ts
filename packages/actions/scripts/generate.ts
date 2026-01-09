/* eslint-disable no-console */
import { promises as fs } from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'
import { trackedActions } from './config.js'

// Types for action.yml structure
interface ActionInput {
  description?: string
  required?: boolean | string
  default?: string
  deprecationMessage?: string
}

interface ActionOutput {
  description?: string
  value?: string
}

interface ActionYml {
  name?: string
  description?: string
  inputs?: Record<string, ActionInput>
  outputs?: Record<string, ActionOutput>
}

interface GeneratedAction {
  owner: string
  repo: string
  version: string
  className: string
  relativePath: string
}

/**
 * Convert a string to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

/**
 * Generate a class name from owner, repo, and version
 * e.g., actions/setup-node@v4 -> ActionsSetupNodeV4
 */
function generateClassName(
  owner: string,
  repo: string,
  version: string,
): string {
  const ownerPart = toPascalCase(owner)
  const repoPart = toPascalCase(repo)
  const versionPart = version.toUpperCase().replace(/[^A-Z0-9]/g, '')
  return `${ownerPart}${repoPart}${versionPart}`
}

/**
 * Calculate the relative import path from the generated file to base.ts
 */
function getRelativeBasePath(): string {
  // From src/generated/{owner}/{repo}/{version}.ts to src/base.ts
  // That's 4 levels up: ../../../..
  return '../../../base.js'
}

interface GitHubTag {
  name: string
}

/**
 * Parse a version string into its components
 * Returns null if the version doesn't match semver-like patterns
 */
function parseVersion(
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
 * Check if a version tag matches the requested major version
 */
function matchesMajorVersion(
  tagVersion: string,
  requestedVersion: string,
): boolean {
  const requested = parseVersion(requestedVersion)
  const tag = parseVersion(tagVersion)

  if (!requested || !tag) return false

  return tag.major === requested.major
}

/**
 * Compare two semver versions, returns positive if a > b, negative if a < b, 0 if equal
 */
function compareSemver(
  a: { major: number; minor: number; patch: number },
  b: { major: number; minor: number; patch: number },
): number {
  if (a.major !== b.major) return a.major - b.major
  if (a.minor !== b.minor) return a.minor - b.minor
  return a.patch - b.patch
}

/**
 * Get GitHub API headers, including auth token if available
 */
function getGitHubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'github-actions-workflow-ts',
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

/**
 * Fetch all tags from a GitHub repository
 */
async function fetchRepoTags(owner: string, repo: string): Promise<string[]> {
  const tags: string[] = []
  let page = 1
  const perPage = 100

  try {
    while (true) {
      const url = `https://api.github.com/repos/${owner}/${repo}/tags?per_page=${perPage}&page=${page}`
      const response = await fetch(url, {
        headers: getGitHubHeaders(),
      })

      if (!response.ok) {
        console.warn(
          `  ⚠ Failed to fetch tags for ${owner}/${repo}: ${response.status}`,
        )
        break
      }

      const data = (await response.json()) as GitHubTag[]
      if (data.length === 0) break

      tags.push(...data.map((tag) => tag.name))

      if (data.length < perPage) break
      page++
    }
  } catch (error) {
    console.warn(`  ⚠ Error fetching tags for ${owner}/${repo}:`, error)
  }

  return tags
}

/**
 * Resolve a major version tag (e.g., v6) to the latest semver tag (e.g., v6.1.0)
 * This mirrors how GitHub Actions resolves version tags
 */
async function resolveVersionTag(
  owner: string,
  repo: string,
  version: string,
): Promise<string> {
  const requestedParsed = parseVersion(version)

  // If the version is already a full semver (has minor and patch), return as-is
  if (requestedParsed) {
    const versionStr = version.replace(/^v?/, '')
    if (versionStr.includes('.') && versionStr.split('.').length >= 2) {
      // Check if it has at least minor version specified (e.g., v1.2 or v1.2.3)
      const parts = versionStr.split('.')
      if (parts.length >= 3 || (parts.length === 2 && parts[1] !== '0')) {
        return version
      }
    }
  }

  // Fetch all tags and find the latest matching the major version
  const tags = await fetchRepoTags(owner, repo)

  const matchingTags = tags
    .filter((tag) => matchesMajorVersion(tag, version))
    .map((tag) => ({ tag, parsed: parseVersion(tag)! }))
    .filter((t) => t.parsed !== null)
    .sort((a, b) => compareSemver(b.parsed, a.parsed)) // Sort descending

  if (matchingTags.length > 0) {
    const resolved = matchingTags[0].tag
    if (resolved !== version) {
      console.log(`    ↳ Resolved ${version} → ${resolved}`)
    }
    return resolved
  }

  // Fallback to original version if no matching tags found
  return version
}

/**
 * Fetch action.yml from GitHub
 * Returns both the parsed action.yml and the resolved version
 */
async function fetchActionYml(
  owner: string,
  repo: string,
  version: string,
): Promise<{ actionYml: ActionYml; resolvedVersion: string } | null> {
  // Resolve the version tag to the latest semver within that major version
  const resolvedVersion = await resolveVersionTag(owner, repo, version)

  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${resolvedVersion}/action.yml`
  const altUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${resolvedVersion}/action.yaml`

  try {
    let response = await fetch(url)
    if (!response.ok) {
      // Try .yaml extension
      response = await fetch(altUrl)
    }
    if (!response.ok) {
      console.warn(
        `  ⚠ Failed to fetch ${owner}/${repo}@${resolvedVersion}: ${response.status}`,
      )
      return null
    }
    const text = await response.text()
    return {
      actionYml: yaml.load(text) as ActionYml,
      resolvedVersion,
    }
  } catch (error) {
    console.warn(
      `  ⚠ Error fetching ${owner}/${repo}@${resolvedVersion}:`,
      error,
    )
    return null
  }
}

/**
 * Escape special characters in JSDoc comments
 */
function escapeJsDoc(str: string | undefined): string {
  if (!str) return ''
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\*/g, '\\*')
    .replace(/\//g, '\\/')
    .replace(/\n/g, ' ')
    .trim()
}

/**
 * Generate TypeScript interface for action inputs
 */
function generateInputsInterface(
  className: string,
  inputs: Record<string, ActionInput> | undefined,
): string {
  if (!inputs || Object.keys(inputs).length === 0) {
    return `export type ${className}Inputs = Record<string, never>`
  }

  const properties = Object.entries(inputs).map(([name, input]) => {
    const description = escapeJsDoc(input.description)
    const isRequired = input.required === true || input.required === 'true'
    const isDeprecated = !!input.deprecationMessage
    const hasDefault = input.default !== undefined && input.default !== ''

    // Build JSDoc parts
    const descPart = description || ''
    const defaultPart = hasDefault
      ? `\n   * @default ${escapeJsDoc(String(input.default))}`
      : ''
    const deprecationPart = isDeprecated
      ? `\n   * @deprecated ${escapeJsDoc(input.deprecationMessage)}`
      : ''

    const jsDoc =
      descPart || hasDefault || isDeprecated
        ? `  /** ${descPart}${defaultPart}${deprecationPart} */\n`
        : ''

    // Determine property name - quote if contains special chars
    const propName = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name) ? name : `'${name}'`

    const optional = isRequired ? '' : '?'

    return `${jsDoc}  ${propName}${optional}: string | boolean | number`
  })

  return `export interface ${className}Inputs {\n${properties.join('\n')}\n}`
}

/**
 * Generate TypeScript type for action outputs
 */
function generateOutputsType(
  className: string,
  outputs: Record<string, ActionOutput> | undefined,
): { type: string; names: string[] } {
  if (!outputs || Object.keys(outputs).length === 0) {
    return {
      type: `export type ${className}Outputs = never`,
      names: [],
    }
  }

  const outputNames = Object.keys(outputs)
  const unionType = outputNames.map((name) => `'${name}'`).join(' | ')

  return {
    type: `export type ${className}Outputs = ${unionType}`,
    names: outputNames,
  }
}

/**
 * Generate the complete TypeScript file for an action
 */
function generateActionFile(
  owner: string,
  repo: string,
  version: string,
  resolvedVersion: string,
  actionYml: ActionYml,
): string {
  const className = generateClassName(owner, repo, version)
  const basePath = getRelativeBasePath()
  const uses = `${owner}/${repo}@${version}`

  // Format resolved version for display (e.g., "v6.2.0")
  const sourceVersionDisplay = resolvedVersion.startsWith('v')
    ? resolvedVersion
    : `v${resolvedVersion}`

  const actionName = escapeJsDoc(actionYml.name) || `${owner}/${repo}`
  const actionDescription = escapeJsDoc(actionYml.description) || ''

  const inputsInterface = generateInputsInterface(className, actionYml.inputs)
  const { type: outputsType, names: outputNames } = generateOutputsType(
    className,
    actionYml.outputs,
  )

  const outputNamesArray =
    outputNames.length > 0
      ? `[\n    ${outputNames.map((n) => `'${n}'`).join(',\n    ')},\n  ] as const`
      : '[] as const'

  return `// This file is auto-generated. Do not edit manually.
import { BaseAction } from '${basePath}'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * ${actionName}
 *
 * ${actionDescription}
 *
 * @see https://github.com/${owner}/${repo}
 */

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const ${className}SourceVersion = '${sourceVersionDisplay}'

${inputsInterface}

${outputsType}

export interface ${className}Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: '${uses}' (uses latest ${version}.x.x)
   * - Pinned: '${owner}/${repo}@${sourceVersionDisplay}' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | '${uses}'
    | '${owner}/${repo}@${sourceVersionDisplay}'
    | (\`${owner}/${repo}@\${string}\` & {})
  /** A map of the input parameters defined by the action. */
  with?: ${className}Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ${className} extends BaseAction<'${uses}', ${className}Outputs> {
  static readonly sourceVersion = '${sourceVersionDisplay}'
  static readonly defaultUses = '${uses}'

  constructor(props: ${className}Props = {}) {
    const outputNames = ${outputNamesArray}

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? '${uses}',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: '${uses}' },
      outputNames,
      '${sourceVersionDisplay}',
      '${uses}',
    )
  }
}
`
}

/**
 * Generate barrel export file for an owner
 */
function generateOwnerIndex(
  owner: string,
  repos: Map<string, string[]>,
): string {
  const exports: string[] = []

  for (const [repo, versions] of repos) {
    for (const version of versions) {
      const versionFile = version.toLowerCase().replace(/[^a-z0-9]/g, '')
      exports.push(`export * from './${repo}/${versionFile}.js'`)
    }
  }

  return `// This file is auto-generated. Do not edit manually.\n${exports.join('\n')}\n`
}

/**
 * Generate the main index.ts file
 */
function generateMainIndex(owners: Set<string>): string {
  const exports = Array.from(owners)
    .sort()
    .map((owner) => `export * from './generated/${owner}/index.js'`)

  return `// This file is auto-generated. Do not edit manually.
export { BaseAction } from './base.js'
${exports.join('\n')}
`
}

/**
 * Ensure directory exists
 */
async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true })
}

/**
 * Generate the actions table for README
 */
function generateActionsTable(
  ownerRepos: Map<string, Map<string, string[]>>,
): string {
  const rows: string[] = []

  // Sort by owner, then by repo
  const sortedOwners = Array.from(ownerRepos.keys()).sort()

  for (const owner of sortedOwners) {
    const repos = ownerRepos.get(owner)!
    const sortedRepos = Array.from(repos.keys()).sort()

    for (const repo of sortedRepos) {
      const versions = repos.get(repo)!
      const actionPath = `${owner}/${repo}`

      // Generate version badges/links
      const versionLinks = versions
        .map((v) => {
          const className = generateClassName(owner, repo, v)
          return `\`${className}\``
        })
        .join(', ')

      // Links column (GitHub repo only, marketplace links are often incorrect)
      const repoLink = `[GitHub](https://github.com/${actionPath})`

      rows.push(`| ${actionPath} | ${versionLinks} | ${repoLink} |`)
    }
  }

  return rows.join('\n')
}

/**
 * Get the package root directory (where package.json is)
 */
function getPackageRoot(): string {
  // scripts/generate.ts -> go up one level to package root
  return path.resolve(import.meta.dirname, '..')
}

/**
 * Update the README.md with the generated actions table
 */
async function updateReadme(
  ownerRepos: Map<string, Map<string, string[]>>,
): Promise<void> {
  const packageRoot = getPackageRoot()
  const readmePath = path.join(packageRoot, 'README.md')

  let content: string
  try {
    content = await fs.readFile(readmePath, 'utf-8')
  } catch {
    console.warn('  ⚠ README.md not found, skipping table update')
    return
  }

  const startMarker = '<!-- GENERATED-ACTIONS-TABLE:START -->'
  const endMarker = '<!-- GENERATED-ACTIONS-TABLE:END -->'

  const startIndex = content.indexOf(startMarker)
  const endIndex = content.indexOf(endMarker)

  if (startIndex === -1 || endIndex === -1) {
    console.warn('  ⚠ README.md markers not found, skipping table update')
    return
  }

  const tableHeader =
    '| Action | Versions | GitHub |\n|--------|----------|--------|'
  const tableContent = generateActionsTable(ownerRepos)

  const newContent =
    content.slice(0, startIndex + startMarker.length) +
    '\n' +
    tableHeader +
    '\n' +
    tableContent +
    '\n' +
    content.slice(endIndex)

  await fs.writeFile(readmePath, newContent)
  console.log('📝 Updated README.md with actions table')
}

/**
 * Main generation function
 */
async function generate(): Promise<void> {
  console.log('🚀 Starting GitHub Actions type generation...\n')

  const packageRoot = getPackageRoot()
  const srcDir = path.join(packageRoot, 'src')
  const generatedDir = path.join(srcDir, 'generated')

  // Clear existing generated files
  try {
    await fs.rm(generatedDir, { recursive: true })
  } catch {
    // Directory doesn't exist, that's fine
  }

  const generatedActions: GeneratedAction[] = []
  const ownerRepos = new Map<string, Map<string, string[]>>()

  // Process each tracked action
  for (const action of trackedActions) {
    console.log(`📦 Processing ${action.owner}/${action.repo}...`)

    for (const version of action.versions) {
      console.log(`  → ${version}`)

      const result = await fetchActionYml(action.owner, action.repo, version)
      if (!result) continue

      const { actionYml, resolvedVersion } = result

      const className = generateClassName(action.owner, action.repo, version)
      const versionFile = version.toLowerCase().replace(/[^a-z0-9]/g, '')

      // Generate file content
      const fileContent = generateActionFile(
        action.owner,
        action.repo,
        version,
        resolvedVersion,
        actionYml,
      )

      // Determine output path
      const actionDir = path.join(generatedDir, action.owner, action.repo)
      await ensureDir(actionDir)

      const filePath = path.join(actionDir, `${versionFile}.ts`)
      await fs.writeFile(filePath, fileContent)

      // Track for index generation
      generatedActions.push({
        owner: action.owner,
        repo: action.repo,
        version,
        className,
        relativePath: `./${action.owner}/${action.repo}/${versionFile}.js`,
      })

      // Build owner -> repos -> versions map
      if (!ownerRepos.has(action.owner)) {
        ownerRepos.set(action.owner, new Map())
      }
      const repos = ownerRepos.get(action.owner)!
      if (!repos.has(action.repo)) {
        repos.set(action.repo, [])
      }
      repos.get(action.repo)!.push(version)
    }
  }

  // Generate owner index files
  for (const [owner, repos] of ownerRepos) {
    const ownerDir = path.join(generatedDir, owner)
    const indexContent = generateOwnerIndex(owner, repos)
    await fs.writeFile(path.join(ownerDir, 'index.ts'), indexContent)
  }

  // Generate main index.ts
  const mainIndexContent = generateMainIndex(new Set(ownerRepos.keys()))
  await fs.writeFile(path.join(srcDir, 'index.ts'), mainIndexContent)

  // Update README with actions table
  await updateReadme(ownerRepos)

  console.log(`\n✅ Generated ${generatedActions.length} action classes`)
  console.log(`📁 Output: ${generatedDir}`)
}

// Run generation
generate().catch((error) => {
  console.error('❌ Generation failed:', error)
  process.exit(1)
})
