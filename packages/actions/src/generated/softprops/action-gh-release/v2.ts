// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * GH Release
 *
 * Github Action for creating Github Releases
 *
 * @see https://github.com/softprops/action-gh-release
 */

export interface SoftpropsActionGhReleaseV2Inputs {
  /** Note-worthy description of changes in release */
  body?: string | boolean | number
  /** Path to load note-worthy description of changes in release from */
  body_path?: string | boolean | number
  /** Gives the release a custom name. Defaults to tag name */
  name?: string | boolean | number
  /** Gives a tag name. Defaults to github.ref_name */
  tag_name?: string | boolean | number
  /** Creates a draft release. Defaults to false */
  draft?: string | boolean | number
  /** Identify the release as a prerelease. Defaults to false */
  prerelease?: string | boolean | number
  /** Preserver the order of the artifacts when uploading */
  preserve_order?: string | boolean | number
  /** Newline-delimited list of path globs for asset files to upload */
  files?: string | boolean | number
  /** Base directory to resolve 'files' globs against (defaults to job working-directory) */
  working_directory?: string | boolean | number
  /** Overwrite existing files with the same name. Defaults to true */
  overwrite_files?: string | boolean | number
  /** Fails if any of the `files` globs match nothing. Defaults to false */
  fail_on_unmatched_files?: string | boolean | number
  /** Repository to make releases against, in <owner>\/<repo> format */
  repository?: string | boolean | number
  /** Authorized secret GitHub Personal Access Token. Defaults to github.token */
  token?: string | boolean | number
  /** Commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. */
  target_commitish?: string | boolean | number
  /** If specified, a discussion of the specified category is created and linked to the release. The value must be a category that already exists in the repository. If there is already a discussion linked to the release, this parameter is ignored. */
  discussion_category_name?: string | boolean | number
  /** Whether to automatically generate the name and body for this release. If name is specified, the specified name will be used; otherwise, a name will be automatically generated. If body is specified, the body will be pre-pended to the automatically generated notes. */
  generate_release_notes?: string | boolean | number
  /** Append to existing body instead of overwriting it. Default is false. */
  append_body?: string | boolean | number
  /** Specifies whether this release should be set as the latest release for the repository. Drafts and prereleases cannot be set as latest. Can be `true`, `false`, or `legacy`. Uses GitHub api default if not provided */
  make_latest?: string | boolean | number
}

export type SoftpropsActionGhReleaseV2Outputs =
  | 'url'
  | 'id'
  | 'upload_url'
  | 'assets'

export interface SoftpropsActionGhReleaseV2Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'softprops/action-gh-release@v2'. */
  uses?:
    | 'softprops/action-gh-release@v2'
    | (`softprops/action-gh-release@v2.${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: SoftpropsActionGhReleaseV2Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class SoftpropsActionGhReleaseV2 extends BaseAction<
  'softprops/action-gh-release@v2',
  SoftpropsActionGhReleaseV2Outputs
> {
  constructor(props: SoftpropsActionGhReleaseV2Props = {}) {
    const outputNames = ['url', 'id', 'upload_url', 'assets'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: 'softprops/action-gh-release@v2',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'softprops/action-gh-release@v2'
      },
      outputNames,
    )
  }
}
