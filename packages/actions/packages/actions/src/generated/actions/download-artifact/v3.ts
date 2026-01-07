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

export interface ActionsDownloadArtifactV3Inputs {
  /** Artifact name */
  name?: string | boolean | number
  /** Destination path */
  path?: string | boolean | number
}

export type ActionsDownloadArtifactV3Outputs = never

export interface ActionsDownloadArtifactV3Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: ActionsDownloadArtifactV3Inputs
}

export class ActionsDownloadArtifactV3 extends BaseAction<ActionsDownloadArtifactV3Outputs> {
  constructor(props: ActionsDownloadArtifactV3Props = {}) {
    const outputNames = [] as const

    super(
      {
        ...props,
        uses: 'actions/download-artifact@v3',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
