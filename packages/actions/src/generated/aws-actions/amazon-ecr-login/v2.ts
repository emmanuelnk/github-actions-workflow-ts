// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Amazon ECR "Login" Action for GitHub Actions
 *
 * Logs in the local Docker client to one or more Amazon ECR Private registries or an Amazon ECR Public registry
 *
 * @see https://github.com/aws-actions/amazon-ecr-login
 */

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const AwsActionsAmazonEcrLoginV2SourceVersion = 'v2.0.1'

export interface AwsActionsAmazonEcrLoginV2Inputs {
  /** Proxy to use for the AWS SDK agent. */
  'http-proxy'?: string | boolean | number
  /** Mask the docker password to prevent it being printed to action logs if debug logging is enabled. NOTE: This will prevent the Docker password output from being shared between separate jobs. Options: ['true', 'false']
   * @default true */
  'mask-password'?: string | boolean | number
  /** A comma-delimited list of AWS account IDs that are associated with the ECR Private registries. If you do not specify a registry, the default ECR Private registry is assumed. If 'public' is given as input to 'registry-type', this input is ignored. */
  registries?: string | boolean | number
  /** Which ECR registry type to log into. Options: [private, public]
   * @default private */
  'registry-type'?: string | boolean | number
  /** Whether to skip explicit logout of the registries during post-job cleanup. Exists for backward compatibility on self-hosted runners. Not recommended. Options: ['true', 'false']
   * @default false */
  'skip-logout'?: string | boolean | number
}

export type AwsActionsAmazonEcrLoginV2Outputs = 'registry'

export interface AwsActionsAmazonEcrLoginV2Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'aws-actions/amazon-ecr-login@v2' (uses latest v2.x.x)
   * - Pinned: 'aws-actions/amazon-ecr-login@v2.0.1' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'aws-actions/amazon-ecr-login@v2'
    | 'aws-actions/amazon-ecr-login@v2.0.1'
    | (`aws-actions/amazon-ecr-login@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: AwsActionsAmazonEcrLoginV2Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class AwsActionsAmazonEcrLoginV2 extends BaseAction<
  'aws-actions/amazon-ecr-login@v2',
  AwsActionsAmazonEcrLoginV2Outputs
> {
  static readonly sourceVersion = 'v2.0.1'
  static readonly defaultUses = 'aws-actions/amazon-ecr-login@v2'

  constructor(props: AwsActionsAmazonEcrLoginV2Props = {}) {
    const outputNames = ['registry'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'aws-actions/amazon-ecr-login@v2',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'aws-actions/amazon-ecr-login@v2'
      },
      outputNames,
      'v2.0.1',
      'aws-actions/amazon-ecr-login@v2',
    )
  }
}
