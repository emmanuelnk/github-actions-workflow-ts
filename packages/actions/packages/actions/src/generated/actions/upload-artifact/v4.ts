// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Upload a Build Artifact
 *
 * Upload a build artifact that can be used by subsequent workflow steps
 *
 * @see https://github.com/actions/upload-artifact
 */

export interface ActionsUploadArtifactV4Inputs {
  /** Artifact name */
  name?: string | boolean | number
  /** A file, directory or wildcard pattern that describes what to upload */
  path: string | boolean | number
  /** The desired behavior if no files are found using the provided path. Available Options:   warn: Output a warning but do not fail the action   error: Fail the action with an error message   ignore: Do not output any warnings or errors, the action does not fail */
  'if-no-files-found'?: string | boolean | number
  /** Duration after which artifact will expire in days. 0 means using default retention. Minimum 1 day. Maximum 90 days unless changed from the repository settings page. */
  'retention-days'?: string | boolean | number
  /** The level of compression for Zlib to be applied to the artifact archive. The value can range from 0 to 9: - 0: No compression - 1: Best speed - 6: Default compression (same as GNU Gzip) - 9: Best compression Higher levels will result in better compression, but will take longer to complete. For large files that are not easily compressed, a value of 0 is recommended for significantly faster uploads. */
  'compression-level'?: string | boolean | number
  /** If true, an artifact with a matching name will be deleted before a new one is uploaded. If false, the action will fail if an artifact for the given name already exists. Does not fail if the artifact does not exist. */
  overwrite?: string | boolean | number
  /** If true, hidden files will be included in the artifact. If false, hidden files will be excluded from the artifact. */
  'include-hidden-files'?: string | boolean | number
}

export type ActionsUploadArtifactV4Outputs =
  | 'artifact-id'
  | 'artifact-url'
  | 'artifact-digest'

export interface ActionsUploadArtifactV4Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: ActionsUploadArtifactV4Inputs
}

export class ActionsUploadArtifactV4 extends BaseAction<ActionsUploadArtifactV4Outputs> {
  constructor(props: ActionsUploadArtifactV4Props = {}) {
    const outputNames = [
      'artifact-id',
      'artifact-url',
      'artifact-digest',
    ] as const

    super(
      {
        ...props,
        uses: 'actions/upload-artifact@v4',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
