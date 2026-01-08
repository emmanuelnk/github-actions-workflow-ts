// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Amazon ECS "Deploy Task Definition" Action for GitHub Actions
 *
 * Registers an Amazon ECS task definition, and deploys it to an ECS service
 *
 * @see https://github.com/aws-actions/amazon-ecs-deploy-task-definition
 */

export interface AwsActionsAmazonEcsDeployTaskDefinitionV2Inputs {
  /** The path to the ECS task definition file to register. */
  'task-definition': string | boolean | number
  /** The number of instantiations of the task to place and keep running in your service. */
  'desired-count'?: string | boolean | number
  /** The name of the ECS service to deploy to. If no service is given, the action will not deploy the task, but only register the task definition. */
  service?: string | boolean | number
  /** The name of the ECS service's cluster.  Will default to the 'default' cluster. */
  cluster?: string | boolean | number
  /** Whether to wait for the ECS service to reach stable state after deploying the new task definition. Valid value is "true". Will default to not waiting. */
  'wait-for-service-stability'?: string | boolean | number
  /** How long to wait for the ECS service to reach stable state, in minutes (default: 30 minutes, max: 6 hours). For CodeDeploy deployments, any wait time configured in the CodeDeploy deployment group will be added to this value. */
  'wait-for-minutes'?: string | boolean | number
  /** The path to the AWS CodeDeploy AppSpec file, if the ECS service uses the CODE_DEPLOY deployment controller. Will default to 'appspec.yaml'. */
  'codedeploy-appspec'?: string | boolean | number
  /** The name of the AWS CodeDeploy application, if the ECS service uses the CODE_DEPLOY deployment controller. Will default to 'AppECS-{cluster}-{service}'. */
  'codedeploy-application'?: string | boolean | number
  /** The name of the AWS CodeDeploy deployment group, if the ECS service uses the CODE_DEPLOY deployment controller. Will default to 'DgpECS-{cluster}-{service}'. */
  'codedeploy-deployment-group'?: string | boolean | number
  /** A description of the deployment, if the ECS service uses the CODE_DEPLOY deployment controller. NOTE: This will be truncated to 512 characters if necessary. */
  'codedeploy-deployment-description'?: string | boolean | number
  /** The name of the AWS CodeDeploy deployment configuration, if the ECS service uses the CODE_DEPLOY deployment controller. If not specified, the value configured in the deployment group or `CodeDeployDefault.OneAtATime` is used as the default. */
  'codedeploy-deployment-config'?: string | boolean | number
  /** Whether to force a new deployment of the service. Valid value is "true". Will default to not force a new deployment. */
  'force-new-deployment'?: string | boolean | number
  /** The name of the volume, to be manage in the ECS service. This value must match the volume name from the Volume object in the task definition, that was configuredAtLaunch. */
  'service-managed-ebs-volume-name'?: string | boolean | number
  /** A JSON object defining the configuration settings for the EBS Service volume that was ConfiguredAtLaunch. You can configure size, volumeType, IOPS, throughput, snapshot and encryption in ServiceManagedEBSVolumeConfiguration. Currently, the only supported volume type is an Amazon EBS volume. */
  'service-managed-ebs-volume'?: string | boolean | number
  /** A boolean indicating whether to run a stand-alone task in a ECS cluster. Task will run before the service is updated if both are provided. Default value is false . */
  'run-task'?: string | boolean | number
  /** A JSON array of container override objects which should applied when running a task outside of a service. Warning: Do not expose this field to untrusted inputs. More details: https:\/\/docs.aws.amazon.com\/AmazonECS\/latest\/APIReference\/API_ContainerOverride.html */
  'run-task-container-overrides'?: string | boolean | number
  /** A comma-separated list of security group IDs to assign to a task when run outside of a service. Will default to none. */
  'run-task-security-groups'?: string | boolean | number
  /** A comma-separated list of subnet IDs to assign to a task when run outside of a service. Will default to none. */
  'run-task-subnets'?: string | boolean | number
  /** Whether the task's elastic network interface receives a public IP address. The default value is DISABLED but will only be applied if run-task-subnets or run-task-security-groups are also set. */
  'run-task-assign-public-IP'?: string | boolean | number
  /** A JSON array of capacity provider strategy items which should applied when running a task outside of a service. Will default to none. */
  'run-task-capacity-provider-strategy'?: string | boolean | number
  /** ECS launch type for tasks run outside of a service. Valid values are 'FARGATE' or 'EC2'. Will default to 'FARGATE'. Will only be applied if run-task-capacity-provider-strategy is not set. */
  'run-task-launch-type'?: string | boolean | number
  /** A name to use for the startedBy tag when running a task outside of a service. Will default to 'GitHub-Actions'. */
  'run-task-started-by'?: string | boolean | number
  /** A JSON array of tags. */
  'run-task-tags'?: string | boolean | number
  /** The name of the volume. This value must match the volume name from the Volume object in the task definition, that was configuredAtLaunch. */
  'run-task-managed-ebs-volume-name'?: string | boolean | number
  /** A JSON object defining the configuration settings for the Amazon EBS task volume that was configuredAtLaunch. These settings are used to create each Amazon EBS volume, with one volume created for each task in the service. The Amazon EBS volumes are visible in your account in the Amazon EC2 console once they are created. */
  'run-task-managed-ebs-volume'?: string | boolean | number
  /** Whether to wait for the task to stop when running it outside of a service. Will default to not wait. */
  'wait-for-task-stopped'?: string | boolean | number
  /** Determines whether to turn on Amazon ECS managed tags 'aws:ecs:serviceName' and 'aws:ecs:clusterName' for the tasks in the service. */
  'enable-ecs-managed-tags'?: string | boolean | number
  /** Determines to propagate the tags from the 'SERVICE' to the task. */
  'propagate-tags'?: string | boolean | number
  /** A comma-separated list of keys whose empty values (empty string, array, or object) should be preserved in the task definition. By default, empty values are removed. */
  'keep-null-value-keys'?: string | boolean | number
}

export type AwsActionsAmazonEcsDeployTaskDefinitionV2Outputs =
  | 'task-definition-arn'
  | 'codedeploy-deployment-id'
  | 'run-task-arn'

export interface AwsActionsAmazonEcsDeployTaskDefinitionV2Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'aws-actions/amazon-ecs-deploy-task-definition@v2'. */
  uses?:
    | 'aws-actions/amazon-ecs-deploy-task-definition@v2'
    | (`aws-actions/amazon-ecs-deploy-task-definition@v2.${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: AwsActionsAmazonEcsDeployTaskDefinitionV2Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class AwsActionsAmazonEcsDeployTaskDefinitionV2 extends BaseAction<
  'aws-actions/amazon-ecs-deploy-task-definition@v2',
  AwsActionsAmazonEcsDeployTaskDefinitionV2Outputs
> {
  constructor(props: AwsActionsAmazonEcsDeployTaskDefinitionV2Props = {}) {
    const outputNames = [
      'task-definition-arn',
      'codedeploy-deployment-id',
      'run-task-arn',
    ] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: 'aws-actions/amazon-ecs-deploy-task-definition@v2',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'aws-actions/amazon-ecs-deploy-task-definition@v2'
      },
      outputNames,
    )
  }
}
