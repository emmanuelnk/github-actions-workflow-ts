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

export interface GithubCodeqlActionV3Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: GithubCodeqlActionV3Inputs
}

export class GithubCodeqlActionV3 extends BaseAction<GithubCodeqlActionV3Outputs> {
  constructor(props: GithubCodeqlActionV3Props = {}) {
    const outputNames = [] as const

    super(
      {
        ...props,
        uses: 'github/codeql-action@v3',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
