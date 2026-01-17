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

export interface AwsActionsConfigureAwsCredentialsV5Inputs {
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
  /** Hosts to skip for the proxy configuration */
  'no-proxy'?: string | boolean | number
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
  /** Whether to export credentials as environment variables. If you set this to false, you probably want to use output-credentials.
   * @default true */
  'output-env-credentials'?: string | boolean | number
  /** Whether to unset the existing credentials in your runner. May be useful if you run this action multiple times in the same job */
  'unset-current-credentials'?: string | boolean | number
  /** Whether to disable the retry and backoff mechanism when the assume role call fails. By default the retry mechanism is enabled */
  'disable-retry'?: string | boolean | number
  /** The maximum number of attempts it will attempt to retry the assume role call. By default it will retry 12 times */
  'retry-max-attempts'?: string | boolean | number
  /** Some environments do not support special characters in AWS_SECRET_ACCESS_KEY. This option will retry fetching credentials until the secret access key does not contain special characters. This option overrides disable-retry and retry-max-attempts. This option is disabled by default */
  'special-characters-workaround'?: string | boolean | number
  /** When enabled, this option will check if there are already valid credentials in the environment. If there are, new credentials will not be fetched. If there are not, the action will run as normal. */
  'use-existing-credentials'?: string | boolean | number
  /** An option comma-delimited list of expected AWS account IDs. The action will fail if we receive credentials for the wrong account. */
  'allowed-account-ids'?: string | boolean | number
  /** When enabled, this option will skip using GitHub OIDC provider even if the id-token permission is set. This is sometimes useful when using IAM instance credentials. */
  'force-skip-oidc'?: string | boolean | number
  /** A global timeout in seconds for the action. When the timeout is reached, the action immediately exits. The default is to run without a timeout. */
  'action-timeout-s'?: string | boolean | number
}

export type AwsActionsConfigureAwsCredentialsV5Outputs =
  | 'aws-account-id'
  | 'aws-access-key-id'
  | 'aws-secret-access-key'
  | 'aws-session-token'
  | 'aws-expiration'

export interface AwsActionsConfigureAwsCredentialsV5Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'aws-actions/configure-aws-credentials@v5'. */
  uses?: 'aws-actions/configure-aws-credentials@v5' | (string & {})
  /** A map of the input parameters defined by the action. */
  with?: AwsActionsConfigureAwsCredentialsV5Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class AwsActionsConfigureAwsCredentialsV5 extends BaseAction<
  'aws-actions/configure-aws-credentials@v5',
  AwsActionsConfigureAwsCredentialsV5Outputs
> {
  protected readonly owner = 'aws-actions'
  protected readonly repo = 'configure-aws-credentials'
  protected readonly tag = 'v5'
  protected readonly resolvedVersion = {
    major: 5,
    minor: 1,
    patch: 1,
  }

  constructor(props: AwsActionsConfigureAwsCredentialsV5Props = {}) {
    const outputNames = [
      'aws-account-id',
      'aws-access-key-id',
      'aws-secret-access-key',
      'aws-session-token',
      'aws-expiration',
    ] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'aws-actions/configure-aws-credentials@v5',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'aws-actions/configure-aws-credentials@v5'
      },
      outputNames,
    )

    if (uses) {
      this.validateUses()
    }
  }
}
