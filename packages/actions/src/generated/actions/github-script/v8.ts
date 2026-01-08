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

export interface ActionsGithubScriptV8Inputs {
  /** The script to run */
  script: string | boolean | number
  /** The GitHub token used to create an authenticated client */
  'github-token'?: string | boolean | number
  /** Whether to tell the GitHub client to log details of its requests. true or false. Default is to run in debug mode when the GitHub Actions step debug logging is turned on. */
  debug?: string | boolean | number
  /** An optional user-agent string */
  'user-agent'?: string | boolean | number
  /** A comma-separated list of GraphQL API previews to accept */
  previews?: string | boolean | number
  /** Either "string" or "json" (default "json")—how the result will be encoded */
  'result-encoding'?: string | boolean | number
  /** The number of times to retry a request */
  retries?: string | boolean | number
  /** A comma separated list of status codes that will NOT be retried e.g. "400,500". No effect unless `retries` is set */
  'retry-exempt-status-codes'?: string | boolean | number
  /** An optional GitHub REST API URL to connect to a different GitHub instance. For example, https:\/\/my.github-enterprise-server.com\/api\/v3 */
  'base-url'?: string | boolean | number
}

export type ActionsGithubScriptV8Outputs = 'result'

export interface ActionsGithubScriptV8Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'actions/github-script@v8'. */
  uses?:
    | 'actions/github-script@v8'
    | (`actions/github-script@v8.${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: ActionsGithubScriptV8Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ActionsGithubScriptV8 extends BaseAction<
  'actions/github-script@v8',
  ActionsGithubScriptV8Outputs
> {
  constructor(props: ActionsGithubScriptV8Props = {}) {
    const outputNames = ['result'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: 'actions/github-script@v8',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'actions/github-script@v8' },
      outputNames,
    )
  }
}
