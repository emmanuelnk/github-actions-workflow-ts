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

export interface PeaceirisActionsGhPagesV4Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: PeaceirisActionsGhPagesV4Inputs
}

export class PeaceirisActionsGhPagesV4 extends BaseAction<PeaceirisActionsGhPagesV4Outputs> {
  constructor(props: PeaceirisActionsGhPagesV4Props = {}) {
    const outputNames = [] as const

    super(
      {
        ...props,
        uses: 'peaceiris/actions-gh-pages@v4',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
