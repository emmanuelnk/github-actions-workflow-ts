// This file is auto-generated. Do not edit manually.
import { BaseAction, type SuppressableDiagnosticCode } from '../../../base.js'
import {
  Diagnostics,
  type GeneratedWorkflowTypes,
} from '@github-actions-workflow-ts/lib'

/**
 * Upload a Build Artifact
 *
 * Upload a build artifact that can be used by subsequent workflow steps
 *
 * @see https://github.com/actions/upload-artifact
 */

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
   * The action reference. If provided, must match 'actions/upload-artifact@v3'.
   * Can be wrapped with Diagnostics.suppress() to suppress specific warnings.
   */
  uses?:
    | 'actions/upload-artifact@v3'
    | (string & {})
    | Diagnostics.SuppressedValue<string>
  /** A map of the input parameters defined by the action. */
  with?: ActionsUploadArtifactV3Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
  /**
   * Diagnostic codes to suppress for this action instance.
   * Use this to suppress version validation warnings in-code.
   * @example ['action-version-semver-violation']
   */
  suppressWarnings?: SuppressableDiagnosticCode[]
}

export class ActionsUploadArtifactV3 extends BaseAction<
  'actions/upload-artifact@v3',
  ActionsUploadArtifactV3Outputs
> {
  protected readonly owner = 'actions'
  protected readonly repo = 'upload-artifact'
  protected readonly tag = 'v3'
  protected readonly resolvedVersion = {
    major: 3,
    minor: 2,
    patch: 1,
  }

  constructor(props: ActionsUploadArtifactV3Props = {}) {
    const outputNames = [] as const

    // Destructure to control property order in output
    const {
      id,
      name,
      with: withProps,
      env,
      uses,
      suppressWarnings,
      ...rest
    } = props

    // Unwrap the uses value if it's wrapped with Diagnostics.suppress()
    const unwrappedUses =
      uses !== undefined ? Diagnostics.unwrapValue(uses) : undefined

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: unwrappedUses ?? 'actions/upload-artifact@v3',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'actions/upload-artifact@v3' },
      outputNames,
      suppressWarnings,
    )

    // Extract suppressions from the uses value if it was wrapped
    if (uses !== undefined) {
      this.addSuppressionsFromValue(uses)
      this.validateUses()
    }
  }
}
