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

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const DockerBuildPushActionV6SourceVersion = 'v6.18.0'

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
  /** Load is a shorthand for --output=type=docker
   * @default false */
  load?: string | boolean | number
  /** Set the networking mode for the RUN instructions during build */
  network?: string | boolean | number
  /** Do not use cache when building the image
   * @default false */
  'no-cache'?: string | boolean | number
  /** Do not cache specified stages */
  'no-cache-filters'?: string | boolean | number
  /** List of output destinations (format: type=local,dest=path) */
  outputs?: string | boolean | number
  /** List of target platforms for build */
  platforms?: string | boolean | number
  /** Generate provenance attestation for the build (shorthand for --attest=type=provenance) */
  provenance?: string | boolean | number
  /** Always attempt to pull all referenced images
   * @default false */
  pull?: string | boolean | number
  /** Push is a shorthand for --output=type=registry
   * @default false */
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
  /** GitHub Token used to authenticate against a repository for Git context
   * @default ${{ github.token }} */
  'github-token'?: string | boolean | number
}

export type DockerBuildPushActionV6Outputs = 'imageid' | 'digest' | 'metadata'

export interface DockerBuildPushActionV6Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'docker/build-push-action@v6' (uses latest v6.x.x)
   * - Pinned: 'docker/build-push-action@v6.18.0' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'docker/build-push-action@v6'
    | 'docker/build-push-action@v6.18.0'
    | (`docker/build-push-action@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: DockerBuildPushActionV6Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class DockerBuildPushActionV6 extends BaseAction<
  'docker/build-push-action@v6',
  DockerBuildPushActionV6Outputs
> {
  static readonly sourceVersion = 'v6.18.0'
  static readonly defaultUses = 'docker/build-push-action@v6'

  constructor(props: DockerBuildPushActionV6Props = {}) {
    const outputNames = ['imageid', 'digest', 'metadata'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'docker/build-push-action@v6',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'docker/build-push-action@v6'
      },
      outputNames,
      'v6.18.0',
      'docker/build-push-action@v6',
    )
  }
}
