// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Download a Build Artifact
 *
 * Download a build artifact that was previously uploaded in the workflow by the upload-artifact action
 *
 * @see https://github.com/actions/download-artifact
 */

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const ActionsDownloadArtifactV4SourceVersion = 'v4.3.0'

export interface ActionsDownloadArtifactV4Inputs {
  /** Name of the artifact to download. If unspecified, all artifacts for the run are downloaded. */
  name?: string | boolean | number
  /** IDs of the artifacts to download, comma-separated. Either inputs `artifact-ids` or `name` can be used, but not both. */
  'artifact-ids'?: string | boolean | number
  /** Destination path. Supports basic tilde expansion. Defaults to $GITHUB_WORKSPACE */
  path?: string | boolean | number
  /** A glob pattern matching the artifacts that should be downloaded. Ignored if name is specified. */
  pattern?: string | boolean | number
  /** When multiple artifacts are matched, this changes the behavior of the destination directories. If true, the downloaded artifacts will be in the same directory specified by path. If false, the downloaded artifacts will be extracted into individual named directories within the specified path.
   * @default false */
  'merge-multiple'?: string | boolean | number
  /** The GitHub token used to authenticate with the GitHub API. This is required when downloading artifacts from a different repository or from a different workflow run. If this is not specified, the action will attempt to download artifacts from the current repository and the current workflow run. */
  'github-token'?: string | boolean | number
  /** The repository owner and the repository name joined together by "\/". If github-token is specified, this is the repository that artifacts will be downloaded from.
   * @default ${{ github.repository }} */
  repository?: string | boolean | number
  /** The id of the workflow run where the desired download artifact was uploaded from. If github-token is specified, this is the run that artifacts will be downloaded from.
   * @default ${{ github.run_id }} */
  'run-id'?: string | boolean | number
}

export type ActionsDownloadArtifactV4Outputs = 'download-path'

export interface ActionsDownloadArtifactV4Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'actions/download-artifact@v4' (uses latest v4.x.x)
   * - Pinned: 'actions/download-artifact@v4.3.0' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'actions/download-artifact@v4'
    | 'actions/download-artifact@v4.3.0'
    | (`actions/download-artifact@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: ActionsDownloadArtifactV4Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ActionsDownloadArtifactV4 extends BaseAction<
  'actions/download-artifact@v4',
  ActionsDownloadArtifactV4Outputs
> {
  static readonly sourceVersion = 'v4.3.0'
  static readonly defaultUses = 'actions/download-artifact@v4'

  constructor(props: ActionsDownloadArtifactV4Props = {}) {
    const outputNames = ['download-path'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'actions/download-artifact@v4',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'actions/download-artifact@v4'
      },
      outputNames,
      'v4.3.0',
      'actions/download-artifact@v4',
    )
  }
}
