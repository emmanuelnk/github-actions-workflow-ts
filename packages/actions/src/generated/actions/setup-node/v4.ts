// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Setup Node.js environment
 *
 * Setup a Node.js environment by adding problem matchers and optionally downloading and adding it to the PATH.
 *
 * @see https://github.com/actions/setup-node
 */

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const ActionsSetupNodeV4SourceVersion = 'v4.4.0'

export interface ActionsSetupNodeV4Inputs {
  /** Set always-auth in npmrc.
   * @default false */
  'always-auth'?: string | boolean | number
  /** Version Spec of the version to use. Examples: 12.x, 10.15.1, >=10.15.0. */
  'node-version'?: string | boolean | number
  /** File containing the version Spec of the version to use.  Examples: package.json, .nvmrc, .node-version, .tool-versions. */
  'node-version-file'?: string | boolean | number
  /** Target architecture for Node to use. Examples: x86, x64. Will use system architecture by default. */
  architecture?: string | boolean | number
  /** Set this option if you want the action to check for the latest available version that satisfies the version spec.
   * @default false */
  'check-latest'?: string | boolean | number
  /** Optional registry to set up for auth. Will set the registry in a project level .npmrc and .yarnrc file, and set up auth to read in from env.NODE_AUTH_TOKEN. */
  'registry-url'?: string | boolean | number
  /** Optional scope for authenticating against scoped registries. Will fall back to the repository owner when using the GitHub Packages registry (https:\/\/npm.pkg.github.com\/). */
  scope?: string | boolean | number
  /** Used to pull node distributions from node-versions. Since there's a default, this is typically not supplied by the user. When running this action on github.com, the default value is sufficient. When running on GHES, you can pass a personal access token for github.com if you are experiencing rate limiting.
   * @default ${{ github.server_url == 'https:\/\/github.com' && github.token || '' }} */
  token?: string | boolean | number
  /** Used to specify a package manager for caching in the default directory. Supported values: npm, yarn, pnpm. */
  cache?: string | boolean | number
  /** Used to specify the path to a dependency file: package-lock.json, yarn.lock, etc. Supports wildcards or a list of file names for caching multiple dependencies. */
  'cache-dependency-path'?: string | boolean | number
  /** Used to specify an alternative mirror to downlooad Node.js binaries from */
  mirror?: string | boolean | number
  /** The token used as Authorization header when fetching from the mirror */
  'mirror-token'?: string | boolean | number
}

export type ActionsSetupNodeV4Outputs = 'cache-hit' | 'node-version'

export interface ActionsSetupNodeV4Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'actions/setup-node@v4' (uses latest v4.x.x)
   * - Pinned: 'actions/setup-node@v4.4.0' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'actions/setup-node@v4'
    | 'actions/setup-node@v4.4.0'
    | (`actions/setup-node@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: ActionsSetupNodeV4Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ActionsSetupNodeV4 extends BaseAction<
  'actions/setup-node@v4',
  ActionsSetupNodeV4Outputs
> {
  static readonly sourceVersion = 'v4.4.0'
  static readonly defaultUses = 'actions/setup-node@v4'

  constructor(props: ActionsSetupNodeV4Props = {}) {
    const outputNames = ['cache-hit', 'node-version'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'actions/setup-node@v4',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'actions/setup-node@v4' },
      outputNames,
      'v4.4.0',
      'actions/setup-node@v4',
    )
  }
}
