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

export type GithubCodeqlActionV3Inputs = Record<string, never>

export type GithubCodeqlActionV3Outputs = never

export interface GithubCodeqlActionV3Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'github/codeql-action@v3'. */
  uses?: 'github/codeql-action@v3'
  /** A map of the input parameters defined by the action. */
  with?: GithubCodeqlActionV3Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class GithubCodeqlActionV3 extends BaseAction<
  'github/codeql-action@v3',
  GithubCodeqlActionV3Outputs
> {
  constructor(props: GithubCodeqlActionV3Props = {}) {
    const outputNames = [] as const

    super(
      {
        ...props,
        uses: 'github/codeql-action@v3',
      } as GeneratedWorkflowTypes.Step & { uses: 'github/codeql-action@v3' },
      outputNames,
    )
  }
}
