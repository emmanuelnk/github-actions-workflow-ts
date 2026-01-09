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

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const ActionsUploadArtifactV3SourceVersion = 'v3.2.1'

export interface ActionsUploadArtifactV3Inputs {
  /** Artifact name
   * @default artifact */
  name?: string | boolean | number
  /** A file, directory or wildcard pattern that describes what to upload */
  path: string | boolean | number
  /** The desired behavior if no files are found using the provided path. Available Options:   warn: Output a warning but do not fail the action   error: Fail the action with an error message   ignore: Do not output any warnings or errors, the action does not fail
   * @default warn */
  'if-no-files-found'?: string | boolean | number
  /** Duration after which artifact will expire in days. 0 means using default retention. Minimum 1 day. Maximum 90 days unless changed from the repository settings page. */
  'retention-days'?: string | boolean | number
  /** If true, hidden files will be included in the uploaded artifact. If false, hidden files will be excluded from the uploaded artifact.
   * @default false */
  'include-hidden-files'?: string | boolean | number
}

export type ActionsUploadArtifactV3Outputs = never

export interface ActionsUploadArtifactV3Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'actions/upload-artifact@v3' (uses latest v3.x.x)
   * - Pinned: 'actions/upload-artifact@v3.2.1' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'actions/upload-artifact@v3'
    | 'actions/upload-artifact@v3.2.1'
    | (`actions/upload-artifact@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: ActionsUploadArtifactV3Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ActionsUploadArtifactV3 extends BaseAction<
  'actions/upload-artifact@v3',
  ActionsUploadArtifactV3Outputs
> {
  static readonly sourceVersion = 'v3.2.1'
  static readonly defaultUses = 'actions/upload-artifact@v3'

  constructor(props: ActionsUploadArtifactV3Props = {}) {
    const outputNames = [] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'actions/upload-artifact@v3',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'actions/upload-artifact@v3' },
      outputNames,
      'v3.2.1',
      'actions/upload-artifact@v3',
    )
  }
}
