/* eslint-disable no-console */
import { promises as fs } from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'
import { trackedActions } from './config.js'
import {
  type PartialSemver,
  parsePartialVersion,
  compareSemver,
} from '../src/utils.js'

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
  version: ResolvedVersion
  className: string
  fileName: string
}

interface ResolvedVersion {
  tag: string
  parsed: PartialSemver
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
  version: PartialSemver,
): string {
  const ownerPart = toPascalCase(owner)
  const repoPart = toPascalCase(repo)
  return `${ownerPart}${repoPart}V${version.major}`
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
 * Check if a version tag matches the requested major version
 */
function matchesMajorVersion(
  tagVersion: string,
  requestedVersion: string,
): boolean {
  const requested = parsePartialVersion(requestedVersion)
  const tag = parsePartialVersion(tagVersion)

  if (!requested || !tag) return false

  return tag.major === requested.major
}

/**
 * Get GitHub API headers, including auth token if available
 */
function getGitHubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'github-actions-workflow-ts',
    ...(process.env.GH_PAT && {
      Authorization: `Bearer ${process.env.GH_PAT}`,
    }),
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
          `  ⚠ Failed to fetch tags for ${owner}/${repo}: ${response.status}\n${await response.text()}`,
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
): Promise<ResolvedVersion | null> {
  const requestedParsed = parsePartialVersion(version)

  if (requestedParsed == null) {
    return null
  }

  // If the version is already a full semver (has minor and patch), return as-is
  if (
    requestedParsed &&
    requestedParsed.minor !== undefined &&
    requestedParsed.patch !== undefined
  ) {
    return {
      tag: version,
      parsed: requestedParsed,
    }
  }

  // Fetch all tags and find the latest matching the major version
  const tags = await fetchRepoTags(owner, repo)

  const matchingTags = tags
    .filter((tag) => matchesMajorVersion(tag, version))
    .map((tag) => ({ tag, parsed: parsePartialVersion(tag)! }))
    .filter((t) => t.parsed !== null)
    .sort((a, b) => compareSemver(b.parsed, a.parsed)) // Sort descending

  if (matchingTags.length > 0) {
    const resolved = matchingTags[0].tag
    if (resolved !== version) {
      console.log(`    ↳ Resolved ${version} → ${resolved}`)
    }
    return matchingTags[0]
  }

  // Fallback to original version if no matching tags found
  return {
    tag: version,
    parsed: requestedParsed,
  }
}

/**
 * Fetch action.yml from GitHub
 */
async function fetchAction(
  owner: string,
  repo: string,
  version: string,
): Promise<{
  yml: ActionYml
  version: ResolvedVersion
} | null> {
  // Resolve the version tag to the latest semver within that major version
  const resolvedVersion = await resolveVersionTag(owner, repo, version)

  if (resolvedVersion === null) {
    return null
  }

  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${resolvedVersion.tag}/action.yml`
  const altUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${resolvedVersion.tag}/action.yaml`

  try {
    let response = await fetch(url)
    if (!response.ok) {
      // Try .yaml extension
      response = await fetch(altUrl)
    }
    if (!response.ok) {
      console.warn(
        `  ⚠ Failed to fetch ${owner}/${repo}@${resolvedVersion.tag}: ${response.status}`,
      )
      return null
    }
    const text = await response.text()
    return {
      yml: yaml.load(text) as ActionYml,
      version: resolvedVersion,
    }
  } catch (error) {
    console.warn(
      `  ⚠ Error fetching ${owner}/${repo}@${resolvedVersion.tag}:`,
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
  tag: string,
  resolvedVersion: ResolvedVersion,
  actionYml: ActionYml,
): string {
  const className = generateClassName(owner, repo, resolvedVersion.parsed)
  const basePath = getRelativeBasePath()
  const uses = `${owner}/${repo}@${tag}`

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

${inputsInterface}

${outputsType}

export interface ${className}Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match '${uses}'. */
  uses?: '${uses}' | string & {}
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
  protected readonly owner = '${owner}'
  protected readonly repo = '${repo}'
  protected readonly tag = '${tag}'
  protected readonly resolvedVersion = {
    major: ${resolvedVersion.parsed.major},
    minor: ${resolvedVersion.parsed.minor ?? 'undefined'},
    patch: ${resolvedVersion.parsed.patch ?? 'undefined'},
  }

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
    )

    if (uses) {
      this.validateUses()
    }
  }
}
`
}

/**
 * Generate barrel export file for an owner
 */
function generateOwnerIndex(
  _owner: string,
  repos: Map<string, GeneratedAction[]>,
): string {
  const exports: string[] = []

  for (const [repo, generatedActions] of repos) {
    for (const action of generatedActions) {
      exports.push(`export * from './${repo}/${action.fileName}'`)
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
  ownerRepos: Map<string, Map<string, GeneratedAction[]>>,
): string {
  const rows: string[] = []

  // Sort by owner, then by repo
  const sortedOwners = Array.from(ownerRepos.keys()).sort()

  for (const owner of sortedOwners) {
    const repos = ownerRepos.get(owner)!
    const sortedRepos = Array.from(repos.keys()).sort()

    for (const repo of sortedRepos) {
      const generatedActions = repos.get(repo)!
      const actionPath = `${owner}/${repo}`

      // Generate version badges/links
      const versionLinks = generatedActions
        .map((g) => {
          return `\`${g.className}\``
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
  ownerRepos: Map<string, Map<string, GeneratedAction[]>>,
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

  let generatedActionCount = 0
  const ownerRepos = new Map<string, Map<string, GeneratedAction[]>>()

  // Process each tracked action
  for (const actionMeta of trackedActions) {
    console.log(`📦 Processing ${actionMeta.owner}/${actionMeta.repo}...`)

    for (const version of actionMeta.versions) {
      console.log(`  → ${version}`)

      const action = await fetchAction(
        actionMeta.owner,
        actionMeta.repo,
        version,
      )
      if (!action) continue

      const className = generateClassName(
        actionMeta.owner,
        actionMeta.repo,
        action.version.parsed,
      )
      const versionFile = version.toLowerCase().replace(/[^a-z0-9]/g, '')

      // Generate file content
      const fileContent = generateActionFile(
        actionMeta.owner,
        actionMeta.repo,
        version,
        action.version,
        action.yml,
      )

      // Determine output path
      const actionDir = path.join(
        generatedDir,
        actionMeta.owner,
        actionMeta.repo,
      )
      await ensureDir(actionDir)

      const filePath = path.join(actionDir, `${versionFile}.ts`)
      await fs.writeFile(filePath, fileContent)

      const generatedAction: GeneratedAction = {
        owner: actionMeta.owner,
        repo: actionMeta.repo,
        version: action.version,
        className,
        fileName: `${versionFile}.js`,
      }

      generatedActionCount += 1

      // Build owner -> repos -> versions map
      if (!ownerRepos.has(actionMeta.owner)) {
        ownerRepos.set(actionMeta.owner, new Map())
      }
      const repos = ownerRepos.get(actionMeta.owner)!
      if (!repos.has(actionMeta.repo)) {
        repos.set(actionMeta.repo, [])
      }
      repos.get(actionMeta.repo)!.push(generatedAction)
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

  console.log(`\n✅ Generated ${generatedActionCount} action classes`)
  console.log(`📁 Output: ${generatedDir}`)
}

// Run generation
generate().catch((error) => {
  console.error('❌ Generation failed:', error)
  process.exit(1)
})
