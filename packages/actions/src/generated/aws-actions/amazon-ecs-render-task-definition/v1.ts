// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Amazon ECS "Render Task Definition" Action for GitHub Actions
 *
 * Inserts a container image URI into a container definition in an Amazon ECS task definition JSON file, creating a new file.
 *
 * @see https://github.com/aws-actions/amazon-ecs-render-task-definition
 */

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const AwsActionsAmazonEcsRenderTaskDefinitionV1SourceVersion = 'v1.8.2'

export interface AwsActionsAmazonEcsRenderTaskDefinitionV1Inputs {
  /** The path to the ECS task definition JSON file */
  'task-definition'?: string | boolean | number
  /** The full Amazon Resource Name (ARN) of the task definition to be used */
  'task-definition-arn'?: string | boolean | number
  /** The name of a family that the task definition is registered to */
  'task-definition-family'?: string | boolean | number
  /** The revision of the task definition being used */
  'task-definition-revision'?: string | boolean | number
  /** The name of the container or containers defined in the containerDefinitions section of the ECS task definition. If more than one container, add the names comma separated. */
  'container-name': string | boolean | number
  /** The URI of the container image to insert into the ECS task definition */
  image: string | boolean | number
  /** Variables to add to the container. Each variable is of the form KEY=value, you can specify multiple variables with multi-line YAML strings. */
  'environment-variables'?: string | boolean | number
  /** Create\/Override logDriver inside logConfiguration */
  'log-configuration-log-driver'?: string | boolean | number
  /** Create\/Override options inside logConfiguration. Each variable is of the form key=value, you can specify multiple variables with multi-line YAML strings. */
  'log-configuration-options'?: string | boolean | number
  /** Create\/Override options inside dockerLabels. Each variable is key=value, you can specify multiple variables with multi-line YAML. */
  'docker-labels'?: string | boolean | number
  /** The command used by ECS to start the container image */
  command?: string | boolean | number
  /** S3 object arns to set env variables onto the container. You can specify multiple files with multi-line YAML strings. */
  'env-files'?: string | boolean | number
  /** Secrets to add to the container. Each secret is of the form KEY=valueFrom, where valueFrom is a secret arn. You can specify multiple secrets with multi-line YAML strings. */
  secrets?: string | boolean | number
}

export type AwsActionsAmazonEcsRenderTaskDefinitionV1Outputs = 'task-definition'

export interface AwsActionsAmazonEcsRenderTaskDefinitionV1Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'aws-actions/amazon-ecs-render-task-definition@v1' (uses latest v1.x.x)
   * - Pinned: 'aws-actions/amazon-ecs-render-task-definition@v1.8.2' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'aws-actions/amazon-ecs-render-task-definition@v1'
    | 'aws-actions/amazon-ecs-render-task-definition@v1.8.2'
    | (`aws-actions/amazon-ecs-render-task-definition@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: AwsActionsAmazonEcsRenderTaskDefinitionV1Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class AwsActionsAmazonEcsRenderTaskDefinitionV1 extends BaseAction<
  'aws-actions/amazon-ecs-render-task-definition@v1',
  AwsActionsAmazonEcsRenderTaskDefinitionV1Outputs
> {
  static readonly sourceVersion = 'v1.8.2'
  static readonly defaultUses =
    'aws-actions/amazon-ecs-render-task-definition@v1'

  constructor(props: AwsActionsAmazonEcsRenderTaskDefinitionV1Props = {}) {
    const outputNames = ['task-definition'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'aws-actions/amazon-ecs-render-task-definition@v1',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'aws-actions/amazon-ecs-render-task-definition@v1'
      },
      outputNames,
      'v1.8.2',
      'aws-actions/amazon-ecs-render-task-definition@v1',
    )
  }
}
