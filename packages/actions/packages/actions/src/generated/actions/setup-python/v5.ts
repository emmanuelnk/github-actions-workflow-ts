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

export interface ActionsSetupPythonV5Inputs {
  /** Version range or exact version of Python or PyPy to use, using SemVer's version range syntax. Reads from .python-version if unset. */
  'python-version'?: string | boolean | number
  /** File containing the Python version to use. Example: .python-version */
  'python-version-file'?: string | boolean | number
  /** Used to specify a package manager for caching in the default directory. Supported values: pip, pipenv, poetry. */
  cache?: string | boolean | number
  /** The target architecture (x86, x64, arm64) of the Python or PyPy interpreter. */
  architecture?: string | boolean | number
  /** Set this option if you want the action to check for the latest available version that satisfies the version spec. */
  'check-latest'?: string | boolean | number
  /** The token used to authenticate when fetching Python distributions from https:\/\/github.com\/actions\/python-versions. When running this action on github.com, the default value is sufficient. When running on GHES, you can pass a personal access token for github.com if you are experiencing rate limiting. */
  token?: string | boolean | number
  /** Used to specify the path to dependency files. Supports wildcards or a list of file names for caching multiple dependencies. */
  'cache-dependency-path'?: string | boolean | number
  /** Set this option if you want the action to update environment variables. */
  'update-environment'?: string | boolean | number
  /** When 'true', a version range passed to 'python-version' input will match prerelease versions if no GA versions are found. Only 'x.y' version range is supported for CPython. */
  'allow-prereleases'?: string | boolean | number
  /** When 'true', use the freethreaded version of Python. */
  freethreaded?: string | boolean | number
}

export type ActionsSetupPythonV5Outputs =
  | 'python-version'
  | 'cache-hit'
  | 'python-path'

export interface ActionsSetupPythonV5Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: ActionsSetupPythonV5Inputs
}

export class ActionsSetupPythonV5 extends BaseAction<ActionsSetupPythonV5Outputs> {
  constructor(props: ActionsSetupPythonV5Props = {}) {
    const outputNames = ['python-version', 'cache-hit', 'python-path'] as const

    super(
      {
        ...props,
        uses: 'actions/setup-python@v5',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
