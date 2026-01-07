// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * "AWS CodeBuild run build" Action For GitHub Actions
 *
 * Execute CodeBuild::startBuild for the current repo.
 *
 * @see https://github.com/aws-actions/aws-codebuild-run-build
 */

export interface AwsActionsAwsCodebuildRunBuildV1Inputs {
  /** AWS CodeBuild Project Name */
  'project-name': string | boolean | number
  /** Buildspec Override */
  'buildspec-override'?: string | boolean | number
  /** The name of a compute type for this build that overrides the one specified in the build project. */
  'compute-type-override'?: string | boolean | number
  /** A container type for this build that overrides the one specified in the build project. */
  'environment-type-override'?: string | boolean | number
  /** The name of an image for this build that overrides the one specified in the build project. */
  'image-override'?: string | boolean | number
  /** The type of credentials CodeBuild uses to pull images in your build. */
  'image-pull-credentials-type-override'?: string | boolean | number
  /** Comma separated list of environment variables to send to CodeBuild */
  'env-vars-for-codebuild'?: string | boolean | number
  /** How often the action calls the API for updates */
  'update-interval'?: string | boolean | number
  /** Base back-off time for the update calls for API if rate-limiting is encountered */
  'update-back-off'?: string | boolean | number
  /** Set to `true` if you want do disable source repo override */
  'disable-source-override'?: string | boolean | number
  /** The source version that overrides the sourceVersion provided to Codebuild. */
  'source-version-override'?: string | boolean | number
  /** The source input type that overrides the source input defined in the build project for this build. Valid values include NO_SOURCE, CODECOMMIT, CODEPIPELINE, GITHUB, S3, BITBUCKET, and GITHUB_ENTERPRISE. */
  'source-type-override'?: string | boolean | number
  /** The location that overrides the source location defined in the build project for this build. */
  'source-location-override'?: string | boolean | number
  /** Set to `true` to prevent the CloudWatch logs from streaming the output to GitHub */
  'hide-cloudwatch-logs'?: string | boolean | number
  /** Set to `true` if you want do disable github environment variables in codebuild */
  'disable-github-env-vars'?: string | boolean | number
  /** The type of build output artifact */
  'artifacts-type-override'?: string | boolean | number
  /** Comma separated list of process signals on which to stop the build. Default is SIGINT. */
  'stop-on-signals'?: string | boolean | number
}

export type AwsActionsAwsCodebuildRunBuildV1Outputs = 'aws-build-id'

export interface AwsActionsAwsCodebuildRunBuildV1Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'aws-actions/aws-codebuild-run-build@v1'. */
  uses?: 'aws-actions/aws-codebuild-run-build@v1'
  /** A map of the input parameters defined by the action. */
  with?: AwsActionsAwsCodebuildRunBuildV1Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class AwsActionsAwsCodebuildRunBuildV1 extends BaseAction<
  'aws-actions/aws-codebuild-run-build@v1',
  AwsActionsAwsCodebuildRunBuildV1Outputs
> {
  constructor(props: AwsActionsAwsCodebuildRunBuildV1Props = {}) {
    const outputNames = ['aws-build-id'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: 'aws-actions/aws-codebuild-run-build@v1',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'aws-actions/aws-codebuild-run-build@v1'
      },
      outputNames,
    )
  }
}
