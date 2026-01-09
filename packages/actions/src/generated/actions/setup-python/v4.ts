// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Setup Python
 *
 * Set up a specific version of Python and add the command-line tools to the PATH.
 *
 * @see https://github.com/actions/setup-python
 */

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const ActionsSetupPythonV4SourceVersion = 'v4.9.1'

export interface ActionsSetupPythonV4Inputs {
  /** Version range or exact version of Python or PyPy to use, using SemVer's version range syntax. Reads from .python-version if unset. */
  'python-version'?: string | boolean | number
  /** File containing the Python version to use. Example: .python-version */
  'python-version-file'?: string | boolean | number
  /** Used to specify a package manager for caching in the default directory. Supported values: pip, pipenv, poetry. */
  cache?: string | boolean | number
  /** The target architecture (x86, x64) of the Python or PyPy interpreter. */
  architecture?: string | boolean | number
  /** Set this option if you want the action to check for the latest available version that satisfies the version spec.
   * @default false */
  'check-latest'?: string | boolean | number
  /** The token used to authenticate when fetching Python distributions from https:\/\/github.com\/actions\/python-versions. When running this action on github.com, the default value is sufficient. When running on GHES, you can pass a personal access token for github.com if you are experiencing rate limiting.
   * @default ${{ github.server_url == 'https:\/\/github.com' && github.token || '' }} */
  token?: string | boolean | number
  /** Used to specify the path to dependency files. Supports wildcards or a list of file names for caching multiple dependencies. */
  'cache-dependency-path'?: string | boolean | number
  /** Set this option if you want the action to update environment variables.
   * @default true */
  'update-environment'?: string | boolean | number
  /** When 'true', a version range passed to 'python-version' input will match prerelease versions if no GA versions are found. Only 'x.y' version range is supported for CPython.
   * @default false */
  'allow-prereleases'?: string | boolean | number
}

export type ActionsSetupPythonV4Outputs =
  | 'python-version'
  | 'cache-hit'
  | 'python-path'

export interface ActionsSetupPythonV4Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'actions/setup-python@v4' (uses latest v4.x.x)
   * - Pinned: 'actions/setup-python@v4.9.1' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'actions/setup-python@v4'
    | 'actions/setup-python@v4.9.1'
    | (`actions/setup-python@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: ActionsSetupPythonV4Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ActionsSetupPythonV4 extends BaseAction<
  'actions/setup-python@v4',
  ActionsSetupPythonV4Outputs
> {
  static readonly sourceVersion = 'v4.9.1'
  static readonly defaultUses = 'actions/setup-python@v4'

  constructor(props: ActionsSetupPythonV4Props = {}) {
    const outputNames = ['python-version', 'cache-hit', 'python-path'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'actions/setup-python@v4',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'actions/setup-python@v4' },
      outputNames,
      'v4.9.1',
      'actions/setup-python@v4',
    )
  }
}
