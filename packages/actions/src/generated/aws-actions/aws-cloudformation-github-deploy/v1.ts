// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * AWS CloudFormation "Deploy CloudFormation Stack" Action for GitHub Actions
 *
 * Deploys a AWS CloudFormation stack
 *
 * @see https://github.com/aws-actions/aws-cloudformation-github-deploy
 */

export interface AwsActionsAwsCloudformationGithubDeployV1Inputs {
  /** The name of the CloudFormation stack */
  name: string | boolean | number
  /** The path or URL to the CloudFormation template */
  template: string | boolean | number
  /** The comma-delimited list of stack template capabilities to acknowledge. Defaults to 'CAPABILITY_IAM' */
  capabilities?: string | boolean | number
  /** The parameters to override in the stack inputs. You can pass a comma-delimited list or a file URL. Comma-delimited list has each entry formatted as <ParameterName>=<ParameterValue> or <ParameterName>="<ParameterValue>,<ParameterValue>". A JSON file can be a local file with a "file:\/\/" prefix or remote URL. The file should look like: [ { "ParameterKey": "KeyPairName", "ParameterValue": "MyKey" }] */
  'parameter-overrides'?: string | boolean | number
  /** Indicates whether to execute to the change set or have it reviewed. Default to '0' (will execute the change set) */
  'no-execute-changeset'?: string | boolean | number
  /** Indicates whether to delete to a failed change set. Default to '0' (will delete the failed changeset) */
  'no-delete-failed-changeset'?: string | boolean | number
  /** If the CloudFormation change set is empty, do not fail. Defaults to '0' (will fail on empty change set) */
  'no-fail-on-empty-changeset'?: string | boolean | number
  /** Disable rollback of the stack if stack creation fails. Defaults to '0' (will rollback if stack creation fails). This input is only used for stack creation, not for stack update */
  'disable-rollback'?: string | boolean | number
  /** The amount of time that can pass before the stack status becomes CREATE_FAILED. This input is only used for stack creation, not for stack update */
  'timeout-in-minutes'?: string | boolean | number
  /** The comma-delimited list of Amazon SNS topic ARNs to publish stack related events */
  'notification-arns'?: string | boolean | number
  /** The Amazon Resource Name (ARN) of an AWS Identity and Access Management (IAM) role that AWS CloudFormation assumes to create the stack. AWS CloudFormation uses the role's credentials to make calls on your behalf. AWS CloudFormation always uses this role for all future operations on the stack. As long as users have permission to operate on the stack, AWS CloudFormation uses this role even if the users don't have permission to pass it. Ensure that the role grants least privilege. If you don't specify a value, AWS CloudFormation uses the role that was previously associated with the stack */
  'role-arn'?: string | boolean | number
  /** Key-value pairs to associate with this stack. This input should be JSON-formatted, for example [ { "Key": "string", "Value": "string" } ] */
  tags?: string | boolean | number
  /** Whether to enable termination protection on the specified stack. Defaults to '0' (terminated protection will be disabled) This input is only used for stack creation, not for stack update */
  'termination-protection'?: string | boolean | number
  /** Proxy to use for the AWS SDK agent */
  'http-proxy'?: string | boolean | number
  /** The name of the change set to create. Defaults to '<stack-name>-CS' */
  'change-set-name'?: string | boolean | number
}

export type AwsActionsAwsCloudformationGithubDeployV1Outputs = 'stack-id'

export interface AwsActionsAwsCloudformationGithubDeployV1Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'aws-actions/aws-cloudformation-github-deploy@v1'. */
  uses?: 'aws-actions/aws-cloudformation-github-deploy@v1' | (string & {})
  /** A map of the input parameters defined by the action. */
  with?: AwsActionsAwsCloudformationGithubDeployV1Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class AwsActionsAwsCloudformationGithubDeployV1 extends BaseAction<
  'aws-actions/aws-cloudformation-github-deploy@v1',
  AwsActionsAwsCloudformationGithubDeployV1Outputs
> {
  protected readonly owner = 'aws-actions'
  protected readonly repo = 'aws-cloudformation-github-deploy'
  protected readonly tag = 'v1'
  protected readonly resolvedVersion = {
    major: 1,
    minor: 3,
    patch: 0,
  }

  constructor(props: AwsActionsAwsCloudformationGithubDeployV1Props = {}) {
    const outputNames = ['stack-id'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'aws-actions/aws-cloudformation-github-deploy@v1',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'aws-actions/aws-cloudformation-github-deploy@v1'
      },
      outputNames,
    )

    if (uses) {
      this.validateUses()
    }
  }
}
