// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * GitHub Pages action
 *
 * GitHub Actions for GitHub Pages 🚀 Deploy static files and publish your site easily. Static-Site-Generators-friendly.
 *
 * @see https://github.com/peaceiris/actions-gh-pages
 */

export interface PeaceirisActionsGhPagesV4Inputs {
  /** Set a SSH private key from repository secret value for pushing to the remote branch. */
  deploy_key?: string | boolean | number
  /** Set a generated GITHUB_TOKEN for pushing to the remote branch. */
  github_token?: string | boolean | number
  /** Set a personal access token for pushing to the remote branch. */
  personal_token?: string | boolean | number
  /** Set a target branch for deployment. */
  publish_branch?: string | boolean | number
  /** Set an input directory for deployment. */
  publish_dir?: string | boolean | number
  /** Set an destination subdirectory for deployment. */
  destination_dir?: string | boolean | number
  /** Set an external repository (owner\/repo). */
  external_repository?: string | boolean | number
  /** If empty commits should be made to the publication branch */
  allow_empty_commit?: string | boolean | number
  /** If existing files in the publish branch should be not removed before deploying */
  keep_files?: string | boolean | number
  /** Keep only the latest commit on a GitHub Pages branch */
  force_orphan?: string | boolean | number
  /** Set Git user.name */
  user_name?: string | boolean | number
  /** Set Git user.email */
  user_email?: string | boolean | number
  /** Set a custom commit message with a triggered commit hash */
  commit_message?: string | boolean | number
  /** Set a custom full commit message without a triggered commit hash */
  full_commit_message?: string | boolean | number
  /** Set tag name */
  tag_name?: string | boolean | number
  /** Set tag message */
  tag_message?: string | boolean | number
  /** Enable the GitHub Pages built-in Jekyll */
  enable_jekyll?: string | boolean | number
  /** An alias for enable_jekyll to disable adding .nojekyll file to a publishing branch */
  disable_nojekyll?: string | boolean | number
  /** Set custom domain */
  cname?: string | boolean | number
  /** Set files or directories to exclude from a publish directory. */
  exclude_assets?: string | boolean | number
}

export type PeaceirisActionsGhPagesV4Outputs = never

export interface PeaceirisActionsGhPagesV4Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'peaceiris/actions-gh-pages@v4'. */
  uses?:
    | 'peaceiris/actions-gh-pages@v4'
    | (`peaceiris/actions-gh-pages@v4.${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: PeaceirisActionsGhPagesV4Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class PeaceirisActionsGhPagesV4 extends BaseAction<
  'peaceiris/actions-gh-pages@v4',
  PeaceirisActionsGhPagesV4Outputs
> {
  constructor(props: PeaceirisActionsGhPagesV4Props = {}) {
    const outputNames = [] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: 'peaceiris/actions-gh-pages@v4',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'peaceiris/actions-gh-pages@v4'
      },
      outputNames,
    )
  }
}
