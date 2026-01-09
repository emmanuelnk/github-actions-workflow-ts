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
export const ActionsDownloadArtifactV3SourceVersion = 'v3.0.2'

export interface ActionsDownloadArtifactV3Inputs {
  /** Artifact name */
  name?: string | boolean | number
  /** Destination path */
  path?: string | boolean | number
}

export type ActionsDownloadArtifactV3Outputs = never

export interface ActionsDownloadArtifactV3Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'actions/download-artifact@v3' (uses latest v3.x.x)
   * - Pinned: 'actions/download-artifact@v3.0.2' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'actions/download-artifact@v3'
    | 'actions/download-artifact@v3.0.2'
    | (`actions/download-artifact@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: ActionsDownloadArtifactV3Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ActionsDownloadArtifactV3 extends BaseAction<
  'actions/download-artifact@v3',
  ActionsDownloadArtifactV3Outputs
> {
  static readonly sourceVersion = 'v3.0.2'
  static readonly defaultUses = 'actions/download-artifact@v3'

  constructor(props: ActionsDownloadArtifactV3Props = {}) {
    const outputNames = [] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'actions/download-artifact@v3',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'actions/download-artifact@v3'
      },
      outputNames,
      'v3.0.2',
      'actions/download-artifact@v3',
    )
  }
}
