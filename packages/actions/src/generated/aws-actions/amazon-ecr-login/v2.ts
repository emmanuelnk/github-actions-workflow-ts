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

export interface AwsActionsAmazonEcrLoginV2Inputs {
  /** Proxy to use for the AWS SDK agent. */
  'http-proxy'?: string | boolean | number
  /** Mask the docker password to prevent it being printed to action logs if debug logging is enabled. NOTE: This will prevent the Docker password output from being shared between separate jobs. Options: ['true', 'false'] */
  'mask-password'?: string | boolean | number
  /** A comma-delimited list of AWS account IDs that are associated with the ECR Private registries. If you do not specify a registry, the default ECR Private registry is assumed. If 'public' is given as input to 'registry-type', this input is ignored. */
  registries?: string | boolean | number
  /** Which ECR registry type to log into. Options: [private, public] */
  'registry-type'?: string | boolean | number
  /** Whether to skip explicit logout of the registries during post-job cleanup. Exists for backward compatibility on self-hosted runners. Not recommended. Options: ['true', 'false'] */
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
  /** The action reference. If provided, must match 'aws-actions/amazon-ecr-login@v2'. */
  uses?:
    | 'aws-actions/amazon-ecr-login@v2'
    | (`aws-actions/amazon-ecr-login@v2.${string}` & {})
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
    )
  }
}
