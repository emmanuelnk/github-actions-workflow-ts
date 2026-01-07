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

/**
 * Fetch action.yml from GitHub
 */
async function fetchActionYml(
  owner: string,
  repo: string,
  version: string,
): Promise<ActionYml | null> {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${version}/action.yml`
  const altUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${version}/action.yaml`

  try {
    let response = await fetch(url)
    if (!response.ok) {
      // Try .yaml extension
      response = await fetch(altUrl)
    }
    if (!response.ok) {
      console.warn(
        `  ⚠ Failed to fetch ${owner}/${repo}@${version}: ${response.status}`,
      )
      return null
    }
    const text = await response.text()
    return yaml.load(text) as ActionYml
  } catch (error) {
    console.warn(`  ⚠ Error fetching ${owner}/${repo}@${version}:`, error)
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
    const deprecationNote = isDeprecated
      ? `\n   * @deprecated ${escapeJsDoc(input.deprecationMessage)}`
      : ''

    const jsDoc =
      description || isDeprecated
        ? `  /** ${description}${deprecationNote} */\n`
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
  actionYml: ActionYml,
): string {
  const className = generateClassName(owner, repo, version)
  const basePath = getRelativeBasePath()
  const uses = `${owner}/${repo}@${version}`

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
  uses?: '${uses}'
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
  constructor(props: ${className}Props = {}) {
    const outputNames = ${outputNamesArray}

    super(
      {
        ...props,
        uses: '${uses}',
      } as GeneratedWorkflowTypes.Step & { uses: '${uses}' },
      outputNames,
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

      // Links column
      const repoLink = `[GitHub](https://github.com/${actionPath})`
      const marketplaceLink = `[Marketplace](https://github.com/marketplace/actions/${repo})`

      rows.push(
        `| ${actionPath} | ${versionLinks} | ${repoLink} · ${marketplaceLink} |`,
      )
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
    '| Action | Versions | Links |\n|--------|----------|-------|'
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

      const actionYml = await fetchActionYml(action.owner, action.repo, version)
      if (!actionYml) continue

      const className = generateClassName(action.owner, action.repo, version)
      const versionFile = version.toLowerCase().replace(/[^a-z0-9]/g, '')

      // Generate file content
      const fileContent = generateActionFile(
        action.owner,
        action.repo,
        version,
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
