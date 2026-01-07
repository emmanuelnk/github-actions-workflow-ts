// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * GitHub Script
 *
 * Run simple scripts using the GitHub client
 *
 * @see https://github.com/actions/github-script
 */

export interface ActionsGithubScriptV6Inputs {
  /** The script to run */
  script: string | boolean | number
  /** The GitHub token used to create an authenticated client */
  'github-token'?: string | boolean | number
  /** Whether to tell the GitHub client to log details of its requests. true or false. Default is to run in debug mode when the GitHub Actions step debug logging is turned on. */
  debug?: string | boolean | number
  /** An optional user-agent string */
  'user-agent'?: string | boolean | number
  /** A comma-separated list of API previews to accept */
  previews?: string | boolean | number
  /** Either "string" or "json" (default "json")—how the result will be encoded */
  'result-encoding'?: string | boolean | number
  /** The number of times to retry a request */
  retries?: string | boolean | number
  /** A comma separated list of status codes that will NOT be retried e.g. "400,500". No effect unless `retries` is set */
  'retry-exempt-status-codes'?: string | boolean | number
}

export type ActionsGithubScriptV6Outputs = 'result'

export interface ActionsGithubScriptV6Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: ActionsGithubScriptV6Inputs
}

export class ActionsGithubScriptV6 extends BaseAction<ActionsGithubScriptV6Outputs> {
  constructor(props: ActionsGithubScriptV6Props = {}) {
    const outputNames = ['result'] as const

    super(
      {
        ...props,
        uses: 'actions/github-script@v6',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
