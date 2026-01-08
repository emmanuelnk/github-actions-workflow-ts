// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Docker Login
 *
 * GitHub Action to login against a Docker registry
 *
 * @see https://github.com/docker/login-action
 */

export interface DockerLoginActionV3Inputs {
  /** Server address of Docker registry. If not set then will default to Docker Hub */
  registry?: string | boolean | number
  /** Username used to log against the Docker registry */
  username?: string | boolean | number
  /** Password or personal access token used to log against the Docker registry */
  password?: string | boolean | number
  /** Specifies whether the given registry is ECR (auto, true or false) */
  ecr?: string | boolean | number
  /** Log out from the Docker registry at the end of a job */
  logout?: string | boolean | number
  /** Raw authentication to registries, defined as YAML objects */
  'registry-auth'?: string | boolean | number
}

export type DockerLoginActionV3Outputs = never

export interface DockerLoginActionV3Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'docker/login-action@v3'. */
  uses?: 'docker/login-action@v3' | (`docker/login-action@v3.${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: DockerLoginActionV3Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class DockerLoginActionV3 extends BaseAction<
  'docker/login-action@v3',
  DockerLoginActionV3Outputs
> {
  constructor(props: DockerLoginActionV3Props = {}) {
    const outputNames = [] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: 'docker/login-action@v3',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'docker/login-action@v3' },
      outputNames,
    )
  }
}
