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

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const DockerLoginActionV2SourceVersion = 'v2.2.0'

export interface DockerLoginActionV2Inputs {
  /** Server address of Docker registry. If not set then will default to Docker Hub */
  registry?: string | boolean | number
  /** Username used to log against the Docker registry */
  username?: string | boolean | number
  /** Password or personal access token used to log against the Docker registry */
  password?: string | boolean | number
  /** Specifies whether the given registry is ECR (auto, true or false)
   * @default auto */
  ecr?: string | boolean | number
  /** Log out from the Docker registry at the end of a job
   * @default true */
  logout?: string | boolean | number
}

export type DockerLoginActionV2Outputs = never

export interface DockerLoginActionV2Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'docker/login-action@v2' (uses latest v2.x.x)
   * - Pinned: 'docker/login-action@v2.2.0' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'docker/login-action@v2'
    | 'docker/login-action@v2.2.0'
    | (`docker/login-action@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: DockerLoginActionV2Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class DockerLoginActionV2 extends BaseAction<
  'docker/login-action@v2',
  DockerLoginActionV2Outputs
> {
  static readonly sourceVersion = 'v2.2.0'
  static readonly defaultUses = 'docker/login-action@v2'

  constructor(props: DockerLoginActionV2Props = {}) {
    const outputNames = [] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'docker/login-action@v2',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'docker/login-action@v2' },
      outputNames,
      'v2.2.0',
      'docker/login-action@v2',
    )
  }
}
