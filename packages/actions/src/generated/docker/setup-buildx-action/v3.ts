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

export interface DockerSetupBuildxActionV3Inputs {
  /** Buildx version. (eg. v0.3.0) */
  version?: string | boolean | number
  /** Sets the builder driver to be used */
  driver?: string | boolean | number
  /** List of additional driver-specific options. (eg. image=moby\/buildkit:master) */
  'driver-opts'?: string | boolean | number
  /** BuildKit daemon flags */
  'buildkitd-flags'?: string | boolean | number
  /** BuildKit daemon config file */
  'buildkitd-config'?: string | boolean | number
  /** Inline BuildKit daemon config */
  'buildkitd-config-inline'?: string | boolean | number
  /** Switch to this builder instance */
  use?: string | boolean | number
  /** Name of the builder. If not specified, one will be generated or if it already exists, it will be used instead of creating a new one. */
  name?: string | boolean | number
  /** Optional address for docker socket or context from `docker context ls` */
  endpoint?: string | boolean | number
  /** Fixed platforms for current node. If not empty, values take priority over the detected ones */
  platforms?: string | boolean | number
  /** Append additional nodes to the builder */
  append?: string | boolean | number
  /** Keep BuildKit state on cleanup. This is only useful on persistent self-hosted runners. */
  'keep-state'?: string | boolean | number
  /** Cache buildx binary to GitHub Actions cache backend */
  'cache-binary'?: string | boolean | number
  /** Cleanup temp files and remove builder at the end of a job */
  cleanup?: string | boolean | number
  /** BuildKit daemon config file
   * @deprecated Use buildkitd-config instead */
  config?: string | boolean | number
  /** Inline BuildKit daemon config
   * @deprecated Use buildkitd-config-inline instead */
  'config-inline'?: string | boolean | number
  /** Sets up docker build command as an alias to docker buildx build
   * @deprecated "docker buildx install" command is deprecated and will be removed in a future release, use BUILDX_BUILDER environment variable instead */
  install?: string | boolean | number
}

export type DockerSetupBuildxActionV3Outputs =
  | 'name'
  | 'driver'
  | 'platforms'
  | 'nodes'
  | 'endpoint'
  | 'status'
  | 'flags'

export interface DockerSetupBuildxActionV3Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'docker/setup-buildx-action@v3'. */
  uses?: 'docker/setup-buildx-action@v3'
  /** A map of the input parameters defined by the action. */
  with?: DockerSetupBuildxActionV3Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class DockerSetupBuildxActionV3 extends BaseAction<
  'docker/setup-buildx-action@v3',
  DockerSetupBuildxActionV3Outputs
> {
  constructor(props: DockerSetupBuildxActionV3Props = {}) {
    const outputNames = [
      'name',
      'driver',
      'platforms',
      'nodes',
      'endpoint',
      'status',
      'flags',
    ] as const

    super(
      {
        ...props,
        uses: 'docker/setup-buildx-action@v3',
      } as GeneratedWorkflowTypes.Step & {
        uses: 'docker/setup-buildx-action@v3'
      },
      outputNames,
    )
  }
}
