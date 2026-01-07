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

export interface ActionsUploadArtifactV3Inputs {
  /** Artifact name */
  name?: string | boolean | number
  /** A file, directory or wildcard pattern that describes what to upload */
  path: string | boolean | number
  /** The desired behavior if no files are found using the provided path. Available Options:   warn: Output a warning but do not fail the action   error: Fail the action with an error message   ignore: Do not output any warnings or errors, the action does not fail */
  'if-no-files-found'?: string | boolean | number
  /** Duration after which artifact will expire in days. 0 means using default retention. Minimum 1 day. Maximum 90 days unless changed from the repository settings page. */
  'retention-days'?: string | boolean | number
  /** If true, hidden files will be included in the uploaded artifact. If false, hidden files will be excluded from the uploaded artifact. */
  'include-hidden-files'?: string | boolean | number
}

export type ActionsUploadArtifactV3Outputs = never

export interface ActionsUploadArtifactV3Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: ActionsUploadArtifactV3Inputs
}

export class ActionsUploadArtifactV3 extends BaseAction<ActionsUploadArtifactV3Outputs> {
  constructor(props: ActionsUploadArtifactV3Props = {}) {
    const outputNames = [] as const

    super(
      {
        ...props,
        uses: 'actions/upload-artifact@v3',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
