// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Release Drafter
 *
 * Drafts your next release notes as pull requests are merged into master.
 *
 * @see https://github.com/release-drafter/release-drafter
 */

export interface ReleaseDrafterReleaseDrafterV6Inputs {
  /** If your workflow requires multiple release-drafter configs it be helpful to override the config-name. The config should still be located inside `.github` as that's where we are looking for config files. */
  'config-name'?: string | boolean | number
  /** The name that will be used in the GitHub release that's created or updated. This will override any `name-template` specified in your `release-drafter.yml` if defined. */
  name?: string | boolean | number
  /** The tag name to be associated with the GitHub release that's created or updated. This will override any `tag-template` specified in your `release-drafter.yml` if defined. */
  tag?: string | boolean | number
  /** The version to be associated with the GitHub release that's created or updated. This will override any version calculated by the release-drafter. */
  version?: string | boolean | number
  /** A boolean indicating whether the release being created or updated should be immediately published. */
  publish?: string | boolean | number
  /** A string indicating whether the release being created or updated should be marked as latest. */
  latest?: string | boolean | number
  /** A boolean indicating whether the release being created or updated is a prerelease. */
  prerelease?: string | boolean | number
  /** A string indicating an identifier (alpha, beta, rc, etc), to increment the prerelease version. */
  'prerelease-identifier'?: string | boolean | number
  /** The object that the release should be created to point to. */
  commitish?: string | boolean | number
  /** A string that would be added before the template body. */
  header?: string | boolean | number
  /** A string that would be added after the template body. */
  footer?: string | boolean | number
  /** A boolean indicating whether the releaser mode is disabled. */
  'disable-releaser'?: string | boolean | number
  /** A boolean indicating whether the autolabeler mode is disabled. */
  'disable-autolabeler'?: string | boolean | number
}

export type ReleaseDrafterReleaseDrafterV6Outputs =
  | 'id'
  | 'name'
  | 'tag_name'
  | 'body'
  | 'html_url'
  | 'upload_url'
  | 'major_version'
  | 'minor_version'
  | 'patch_version'
  | 'resolved_version'

export interface ReleaseDrafterReleaseDrafterV6Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'release-drafter/release-drafter@v6'. */
  uses?: 'release-drafter/release-drafter@v6'
  /** A map of the input parameters defined by the action. */
  with?: ReleaseDrafterReleaseDrafterV6Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ReleaseDrafterReleaseDrafterV6 extends BaseAction<
  'release-drafter/release-drafter@v6',
  ReleaseDrafterReleaseDrafterV6Outputs
> {
  constructor(props: ReleaseDrafterReleaseDrafterV6Props = {}) {
    const outputNames = [
      'id',
      'name',
      'tag_name',
      'body',
      'html_url',
      'upload_url',
      'major_version',
      'minor_version',
      'patch_version',
      'resolved_version',
    ] as const

    super(
      {
        ...props,
        uses: 'release-drafter/release-drafter@v6',
      } as GeneratedWorkflowTypes.Step & {
        uses: 'release-drafter/release-drafter@v6'
      },
      outputNames,
    )
  }
}
