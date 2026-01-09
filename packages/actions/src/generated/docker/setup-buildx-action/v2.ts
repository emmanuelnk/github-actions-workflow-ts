// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Docker Setup Buildx
 *
 * Set up Docker Buildx
 *
 * @see https://github.com/docker/setup-buildx-action
 */

export interface DockerSetupBuildxActionV2Inputs {
  /** Buildx version. (eg. v0.3.0) */
  version?: string | boolean | number
  /** Sets the builder driver to be used */
  driver?: string | boolean | number
  /** List of additional driver-specific options. (eg. image=moby\/buildkit:master) */
  'driver-opts'?: string | boolean | number
  /** Flags for buildkitd daemon */
  'buildkitd-flags'?: string | boolean | number
  /** Sets up docker build command as an alias to docker buildx build */
  install?: string | boolean | number
  /** Switch to this builder instance */
  use?: string | boolean | number
  /** Optional address for docker socket or context from `docker context ls` */
  endpoint?: string | boolean | number
  /** Fixed platforms for current node. If not empty, values take priority over the detected ones */
  platforms?: string | boolean | number
  /** BuildKit config file */
  config?: string | boolean | number
  /** Inline BuildKit config */
  'config-inline'?: string | boolean | number
  /** Append additional nodes to the builder */
  append?: string | boolean | number
  /** Cleanup temp files and remove builder at the end of a job */
  cleanup?: string | boolean | number
}

export type DockerSetupBuildxActionV2Outputs =
  | 'name'
  | 'driver'
  | 'platforms'
  | 'nodes'
  | 'endpoint'
  | 'status'
  | 'flags'

export interface DockerSetupBuildxActionV2Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'docker/setup-buildx-action@v2'. */
  uses?:
    | 'docker/setup-buildx-action@v2'
    | (`docker/setup-buildx-action@v2.${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: DockerSetupBuildxActionV2Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class DockerSetupBuildxActionV2 extends BaseAction<
  'docker/setup-buildx-action@v2',
  DockerSetupBuildxActionV2Outputs
> {
  constructor(props: DockerSetupBuildxActionV2Props = {}) {
    const outputNames = [
      'name',
      'driver',
      'platforms',
      'nodes',
      'endpoint',
      'status',
      'flags',
    ] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'docker/setup-buildx-action@v2',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'docker/setup-buildx-action@v2'
      },
      outputNames,
    )
  }
}
