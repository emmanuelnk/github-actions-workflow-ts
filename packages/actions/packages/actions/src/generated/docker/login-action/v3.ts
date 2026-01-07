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

export interface DockerLoginActionV3Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: DockerLoginActionV3Inputs
}

export class DockerLoginActionV3 extends BaseAction<DockerLoginActionV3Outputs> {
  constructor(props: DockerLoginActionV3Props = {}) {
    const outputNames = [] as const

    super(
      {
        ...props,
        uses: 'docker/login-action@v3',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
