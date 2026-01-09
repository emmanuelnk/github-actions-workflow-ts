// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * CodeQL: Stub
 *
 * Stub: Don't use this action directly. Read [the documentation](https:\/\/docs.github.com\/en\/code-security\/code-scanning\/introduction-to-code-scanning\/about-code-scanning-with-codeql) instead.
 *
 * @see https://github.com/github/codeql-action
 */

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const GithubCodeqlActionV2SourceVersion = 'v2.28.1'

export type GithubCodeqlActionV2Inputs = Record<string, never>

export type GithubCodeqlActionV2Outputs = never

export interface GithubCodeqlActionV2Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'github/codeql-action@v2' (uses latest v2.x.x)
   * - Pinned: 'github/codeql-action@v2.28.1' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'github/codeql-action@v2'
    | 'github/codeql-action@v2.28.1'
    | (`github/codeql-action@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: GithubCodeqlActionV2Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class GithubCodeqlActionV2 extends BaseAction<
  'github/codeql-action@v2',
  GithubCodeqlActionV2Outputs
> {
  static readonly sourceVersion = 'v2.28.1'
  static readonly defaultUses = 'github/codeql-action@v2'

  constructor(props: GithubCodeqlActionV2Props = {}) {
    const outputNames = [] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'github/codeql-action@v2',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'github/codeql-action@v2' },
      outputNames,
      'v2.28.1',
      'github/codeql-action@v2',
    )
  }
}
