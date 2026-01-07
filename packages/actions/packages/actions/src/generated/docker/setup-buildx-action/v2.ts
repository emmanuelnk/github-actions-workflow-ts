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

export interface DockerSetupBuildxActionV2Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: DockerSetupBuildxActionV2Inputs
}

export class DockerSetupBuildxActionV2 extends BaseAction<DockerSetupBuildxActionV2Outputs> {
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

    super(
      {
        ...props,
        uses: 'docker/setup-buildx-action@v2',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
