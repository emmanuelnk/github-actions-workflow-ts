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

export type GithubCodeqlActionV2Inputs = Record<string, never>

export type GithubCodeqlActionV2Outputs = never

export interface GithubCodeqlActionV2Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: GithubCodeqlActionV2Inputs
}

export class GithubCodeqlActionV2 extends BaseAction<GithubCodeqlActionV2Outputs> {
  constructor(props: GithubCodeqlActionV2Props = {}) {
    const outputNames = [] as const

    super(
      {
        ...props,
        uses: 'github/codeql-action@v2',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
