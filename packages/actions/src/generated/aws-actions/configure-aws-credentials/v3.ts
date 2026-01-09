// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * "Configure AWS Credentials" Action for GitHub Actions
 *
 * Configures AWS credentials for use in subsequent steps in a GitHub Action workflow
 *
 * @see https://github.com/aws-actions/configure-aws-credentials
 */

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const AwsActionsConfigureAwsCredentialsV3SourceVersion = 'v3.0.2'

export interface AwsActionsConfigureAwsCredentialsV3Inputs {
  /** AWS Region, e.g. us-east-2 */
  'aws-region': string | boolean | number
  /** The Amazon Resource Name (ARN) of the role to assume. Use the provided credentials to assume an IAM role and configure the Actions environment with the assumed role credentials rather than with the provided credentials. */
  'role-to-assume'?: string | boolean | number
  /** AWS Access Key ID. Provide this key if you want to assume a role using access keys rather than a web identity token. */
  'aws-access-key-id'?: string | boolean | number
  /** AWS Secret Access Key. Required if aws-access-key-id is provided. */
  'aws-secret-access-key'?: string | boolean | number
  /** AWS Session Token. */
  'aws-session-token'?: string | boolean | number
  /** Use the web identity token file from the provided file system path in order to assume an IAM role using a web identity, e.g. from within an Amazon EKS worker node. */
  'web-identity-token-file'?: string | boolean | number
  /** Use existing credentials from the environment to assume a new role, rather than providing credentials as input. */
  'role-chaining'?: string | boolean | number
  /** The audience to use for the OIDC provider
   * @default sts.amazonaws.com */
  audience?: string | boolean | number
  /** Proxy to use for the AWS SDK agent */
  'http-proxy'?: string | boolean | number
  /** Whether to mask the AWS account ID for these credentials as a secret value. By default the account ID will not be masked */
  'mask-aws-account-id'?: string | boolean | number
  /** Role duration in seconds. Default is one hour. */
  'role-duration-seconds'?: string | boolean | number
  /** The external ID of the role to assume. */
  'role-external-id'?: string | boolean | number
  /** Role session name (default: GitHubActions) */
  'role-session-name'?: string | boolean | number
  /** Skip session tagging during role assumption */
  'role-skip-session-tagging'?: string | boolean | number
  /** Define an inline session policy to use when assuming a role */
  'inline-session-policy'?: string | boolean | number
  /** Define a list of managed session policies to use when assuming a role */
  'managed-session-policies'?: string | boolean | number
  /** Whether to set credentials as step output */
  'output-credentials'?: string | boolean | number
  /** Whether to unset the existing credentials in your runner. May be useful if you run this action multiple times in the same job */
  'unset-current-credentials'?: string | boolean | number
  /** Whether to disable the retry and backoff mechanism when the assume role call fails. By default the retry mechanism is enabled */
  'disable-retry'?: string | boolean | number
  /** The maximum number of attempts it will attempt to retry the assume role call. By default it will retry 12 times */
  'retry-max-attempts'?: string | boolean | number
  /** Some environments do not support special characters in AWS_SECRET_ACCESS_KEY. This option will retry fetching credentials until the secret access key does not contain special characters. This option overrides disable-retry and retry-max-attempts. This option is disabled by default */
  'special-characters-workaround'?: string | boolean | number
}

export type AwsActionsConfigureAwsCredentialsV3Outputs =
  | 'aws-account-id'
  | 'aws-access-key-id'
  | 'aws-secret-access-key'
  | 'aws-session-token'

export interface AwsActionsConfigureAwsCredentialsV3Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'aws-actions/configure-aws-credentials@v3' (uses latest v3.x.x)
   * - Pinned: 'aws-actions/configure-aws-credentials@v3.0.2' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'aws-actions/configure-aws-credentials@v3'
    | 'aws-actions/configure-aws-credentials@v3.0.2'
    | (`aws-actions/configure-aws-credentials@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: AwsActionsConfigureAwsCredentialsV3Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class AwsActionsConfigureAwsCredentialsV3 extends BaseAction<
  'aws-actions/configure-aws-credentials@v3',
  AwsActionsConfigureAwsCredentialsV3Outputs
> {
  static readonly sourceVersion = 'v3.0.2'
  static readonly defaultUses = 'aws-actions/configure-aws-credentials@v3'

  constructor(props: AwsActionsConfigureAwsCredentialsV3Props = {}) {
    const outputNames = [
      'aws-account-id',
      'aws-access-key-id',
      'aws-secret-access-key',
      'aws-session-token',
    ] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'aws-actions/configure-aws-credentials@v3',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'aws-actions/configure-aws-credentials@v3'
      },
      outputNames,
      'v3.0.2',
      'aws-actions/configure-aws-credentials@v3',
    )
  }
}
