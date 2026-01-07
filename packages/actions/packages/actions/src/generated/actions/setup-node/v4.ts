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

export interface ActionsSetupNodeV4Inputs {
  /** Set always-auth in npmrc. */
  'always-auth'?: string | boolean | number
  /** Version Spec of the version to use. Examples: 12.x, 10.15.1, >=10.15.0. */
  'node-version'?: string | boolean | number
  /** File containing the version Spec of the version to use.  Examples: package.json, .nvmrc, .node-version, .tool-versions. */
  'node-version-file'?: string | boolean | number
  /** Target architecture for Node to use. Examples: x86, x64. Will use system architecture by default. */
  architecture?: string | boolean | number
  /** Set this option if you want the action to check for the latest available version that satisfies the version spec. */
  'check-latest'?: string | boolean | number
  /** Optional registry to set up for auth. Will set the registry in a project level .npmrc and .yarnrc file, and set up auth to read in from env.NODE_AUTH_TOKEN. */
  'registry-url'?: string | boolean | number
  /** Optional scope for authenticating against scoped registries. Will fall back to the repository owner when using the GitHub Packages registry (https:\/\/npm.pkg.github.com\/). */
  scope?: string | boolean | number
  /** Used to pull node distributions from node-versions. Since there's a default, this is typically not supplied by the user. When running this action on github.com, the default value is sufficient. When running on GHES, you can pass a personal access token for github.com if you are experiencing rate limiting. */
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

export interface ActionsSetupNodeV4Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: ActionsSetupNodeV4Inputs
}

export class ActionsSetupNodeV4 extends BaseAction<ActionsSetupNodeV4Outputs> {
  constructor(props: ActionsSetupNodeV4Props = {}) {
    const outputNames = ['cache-hit', 'node-version'] as const

    super(
      {
        ...props,
        uses: 'actions/setup-node@v4',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
