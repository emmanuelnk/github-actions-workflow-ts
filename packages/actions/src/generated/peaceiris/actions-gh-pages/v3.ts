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

/**
 * The version of the action from which these types were generated.
 * Types are guaranteed to be accurate for this version and later.
 * Using an earlier version may result in type mismatches.
 */
export const PeaceirisActionsGhPagesV3SourceVersion = 'v3.9.3'

export interface PeaceirisActionsGhPagesV3Inputs {
  /** Set a SSH private key from repository secret value for pushing to the remote branch. */
  deploy_key?: string | boolean | number
  /** Set a generated GITHUB_TOKEN for pushing to the remote branch. */
  github_token?: string | boolean | number
  /** Set a personal access token for pushing to the remote branch. */
  personal_token?: string | boolean | number
  /** Set a target branch for deployment.
   * @default gh-pages */
  publish_branch?: string | boolean | number
  /** Set an input directory for deployment.
   * @default public */
  publish_dir?: string | boolean | number
  /** Set an destination subdirectory for deployment. */
  destination_dir?: string | boolean | number
  /** Set an external repository (owner\/repo). */
  external_repository?: string | boolean | number
  /** If empty commits should be made to the publication branch
   * @default false */
  allow_empty_commit?: string | boolean | number
  /** If existing files in the publish branch should be not removed before deploying
   * @default false */
  keep_files?: string | boolean | number
  /** Keep only the latest commit on a GitHub Pages branch
   * @default false */
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
  /** Enable the GitHub Pages built-in Jekyll
   * @default false */
  enable_jekyll?: string | boolean | number
  /** An alias for enable_jekyll to disable adding .nojekyll file to a publishing branch
   * @default false */
  disable_nojekyll?: string | boolean | number
  /** Set custom domain */
  cname?: string | boolean | number
  /** Set files or directories to exclude from a publish directory.
   * @default .github */
  exclude_assets?: string | boolean | number
}

export type PeaceirisActionsGhPagesV3Outputs = never

export interface PeaceirisActionsGhPagesV3Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference.
   * - Default: 'peaceiris/actions-gh-pages@v3' (uses latest v3.x.x)
   * - Pinned: 'peaceiris/actions-gh-pages@v3.9.3' (types generated from this version)
   * - Custom: Any valid ref (commit SHA, branch, tag, or fork)
   */
  uses?:
    | 'peaceiris/actions-gh-pages@v3'
    | 'peaceiris/actions-gh-pages@v3.9.3'
    | (`peaceiris/actions-gh-pages@${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: PeaceirisActionsGhPagesV3Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class PeaceirisActionsGhPagesV3 extends BaseAction<
  'peaceiris/actions-gh-pages@v3',
  PeaceirisActionsGhPagesV3Outputs
> {
  static readonly sourceVersion = 'v3.9.3'
  static readonly defaultUses = 'peaceiris/actions-gh-pages@v3'

  constructor(props: PeaceirisActionsGhPagesV3Props = {}) {
    const outputNames = [] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'peaceiris/actions-gh-pages@v3',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & {
        uses: 'peaceiris/actions-gh-pages@v3'
      },
      outputNames,
      'v3.9.3',
      'peaceiris/actions-gh-pages@v3',
    )
  }
}
