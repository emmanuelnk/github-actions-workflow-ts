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

export interface ActionsDownloadArtifactV4Inputs {
  /** Name of the artifact to download. If unspecified, all artifacts for the run are downloaded. */
  name?: string | boolean | number
  /** IDs of the artifacts to download, comma-separated. Either inputs `artifact-ids` or `name` can be used, but not both. */
  'artifact-ids'?: string | boolean | number
  /** Destination path. Supports basic tilde expansion. Defaults to $GITHUB_WORKSPACE */
  path?: string | boolean | number
  /** A glob pattern matching the artifacts that should be downloaded. Ignored if name is specified. */
  pattern?: string | boolean | number
  /** When multiple artifacts are matched, this changes the behavior of the destination directories. If true, the downloaded artifacts will be in the same directory specified by path. If false, the downloaded artifacts will be extracted into individual named directories within the specified path. */
  'merge-multiple'?: string | boolean | number
  /** The GitHub token used to authenticate with the GitHub API. This is required when downloading artifacts from a different repository or from a different workflow run. If this is not specified, the action will attempt to download artifacts from the current repository and the current workflow run. */
  'github-token'?: string | boolean | number
  /** The repository owner and the repository name joined together by "\/". If github-token is specified, this is the repository that artifacts will be downloaded from. */
  repository?: string | boolean | number
  /** The id of the workflow run where the desired download artifact was uploaded from. If github-token is specified, this is the run that artifacts will be downloaded from. */
  'run-id'?: string | boolean | number
}

export type ActionsDownloadArtifactV4Outputs = 'download-path'

export interface ActionsDownloadArtifactV4Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: ActionsDownloadArtifactV4Inputs
}

export class ActionsDownloadArtifactV4 extends BaseAction<ActionsDownloadArtifactV4Outputs> {
  constructor(props: ActionsDownloadArtifactV4Props = {}) {
    const outputNames = ['download-path'] as const

    super(
      {
        ...props,
        uses: 'actions/download-artifact@v4',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
