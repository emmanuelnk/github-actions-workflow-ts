// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Build and push Docker images
 *
 * Build and push Docker images with Buildx
 *
 * @see https://github.com/docker/build-push-action
 */

export interface DockerBuildPushActionV6Inputs {
  /** List of a customs host-to-IP mapping (e.g., docker:10.180.0.1) */
  'add-hosts'?: string | boolean | number
  /** List of extra privileged entitlement (e.g., network.host,security.insecure) */
  allow?: string | boolean | number
  /** List of annotation to set to the image */
  annotations?: string | boolean | number
  /** List of attestation parameters (e.g., type=sbom,generator=image) */
  attests?: string | boolean | number
  /** List of build-time variables */
  'build-args'?: string | boolean | number
  /** List of additional build contexts (e.g., name=path) */
  'build-contexts'?: string | boolean | number
  /** Builder instance */
  builder?: string | boolean | number
  /** List of external cache sources for buildx (e.g., user\/app:cache, type=local,src=path\/to\/dir) */
  'cache-from'?: string | boolean | number
  /** List of cache export destinations for buildx (e.g., user\/app:cache, type=local,dest=path\/to\/dir) */
  'cache-to'?: string | boolean | number
  /** Set method for evaluating build (e.g., check) */
  call?: string | boolean | number
  /** Optional parent cgroup for the container used in the build */
  'cgroup-parent'?: string | boolean | number
  /** Build's context is the set of files located in the specified PATH or URL */
  context?: string | boolean | number
  /** Path to the Dockerfile */
  file?: string | boolean | number
  /** List of metadata for an image */
  labels?: string | boolean | number
  /** Load is a shorthand for --output=type=docker */
  load?: string | boolean | number
  /** Set the networking mode for the RUN instructions during build */
  network?: string | boolean | number
  /** Do not use cache when building the image */
  'no-cache'?: string | boolean | number
  /** Do not cache specified stages */
  'no-cache-filters'?: string | boolean | number
  /** List of output destinations (format: type=local,dest=path) */
  outputs?: string | boolean | number
  /** List of target platforms for build */
  platforms?: string | boolean | number
  /** Generate provenance attestation for the build (shorthand for --attest=type=provenance) */
  provenance?: string | boolean | number
  /** Always attempt to pull all referenced images */
  pull?: string | boolean | number
  /** Push is a shorthand for --output=type=registry */
  push?: string | boolean | number
  /** Generate SBOM attestation for the build (shorthand for --attest=type=sbom) */
  sbom?: string | boolean | number
  /** List of secrets to expose to the build (e.g., key=string, GIT_AUTH_TOKEN=mytoken) */
  secrets?: string | boolean | number
  /** List of secret env vars to expose to the build (e.g., key=envname, MY_SECRET=MY_ENV_VAR) */
  'secret-envs'?: string | boolean | number
  /** List of secret files to expose to the build (e.g., key=filename, MY_SECRET=.\/secret.txt) */
  'secret-files'?: string | boolean | number
  /** Size of \/dev\/shm (e.g., 2g) */
  'shm-size'?: string | boolean | number
  /** List of SSH agent socket or keys to expose to the build */
  ssh?: string | boolean | number
  /** List of tags */
  tags?: string | boolean | number
  /** Sets the target stage to build */
  target?: string | boolean | number
  /** Ulimit options (e.g., nofile=1024:1024) */
  ulimit?: string | boolean | number
  /** GitHub Token used to authenticate against a repository for Git context */
  'github-token'?: string | boolean | number
}

export type DockerBuildPushActionV6Outputs = 'imageid' | 'digest' | 'metadata'

export interface DockerBuildPushActionV6Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: DockerBuildPushActionV6Inputs
}

export class DockerBuildPushActionV6 extends BaseAction<DockerBuildPushActionV6Outputs> {
  constructor(props: DockerBuildPushActionV6Props = {}) {
    const outputNames = ['imageid', 'digest', 'metadata'] as const

    super(
      {
        ...props,
        uses: 'docker/build-push-action@v6',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
