// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Checkout
 *
 * Checkout a Git repository at a particular version
 *
 * @see https://github.com/actions/checkout
 */

export interface ActionsCheckoutV6Inputs {
  /** Repository name with owner. For example, actions\/checkout */
  repository?: string | boolean | number
  /** The branch, tag or SHA to checkout. When checking out the repository that triggered a workflow, this defaults to the reference or SHA for that event.  Otherwise, uses the default branch. */
  ref?: string | boolean | number
  /** Personal access token (PAT) used to fetch the repository. The PAT is configured with the local git config, which enables your scripts to run authenticated git commands. The post-job step removes the PAT.  We recommend using a service account with the least permissions necessary. Also when generating a new PAT, select the least scopes necessary.  [Learn more about creating and using encrypted secrets](https:\/\/help.github.com\/en\/actions\/automating-your-workflow-with-github-actions\/creating-and-using-encrypted-secrets) */
  token?: string | boolean | number
  /** SSH key used to fetch the repository. The SSH key is configured with the local git config, which enables your scripts to run authenticated git commands. The post-job step removes the SSH key.  We recommend using a service account with the least permissions necessary.  [Learn more about creating and using encrypted secrets](https:\/\/help.github.com\/en\/actions\/automating-your-workflow-with-github-actions\/creating-and-using-encrypted-secrets) */
  'ssh-key'?: string | boolean | number
  /** Known hosts in addition to the user and global host key database. The public SSH keys for a host may be obtained using the utility `ssh-keyscan`. For example, `ssh-keyscan github.com`. The public key for github.com is always implicitly added. */
  'ssh-known-hosts'?: string | boolean | number
  /** Whether to perform strict host key checking. When true, adds the options `StrictHostKeyChecking=yes` and `CheckHostIP=no` to the SSH command line. Use the input `ssh-known-hosts` to configure additional hosts. */
  'ssh-strict'?: string | boolean | number
  /** The user to use when connecting to the remote SSH host. By default 'git' is used. */
  'ssh-user'?: string | boolean | number
  /** Whether to configure the token or SSH key with the local git config */
  'persist-credentials'?: string | boolean | number
  /** Relative path under $GITHUB_WORKSPACE to place the repository */
  path?: string | boolean | number
  /** Whether to execute `git clean -ffdx && git reset --hard HEAD` before fetching */
  clean?: string | boolean | number
  /** Partially clone against a given filter. Overrides sparse-checkout if set. */
  filter?: string | boolean | number
  /** Do a sparse checkout on given patterns. Each pattern should be separated with new lines. */
  'sparse-checkout'?: string | boolean | number
  /** Specifies whether to use cone-mode when doing a sparse checkout. */
  'sparse-checkout-cone-mode'?: string | boolean | number
  /** Number of commits to fetch. 0 indicates all history for all branches and tags. */
  'fetch-depth'?: string | boolean | number
  /** Whether to fetch tags, even if fetch-depth > 0. */
  'fetch-tags'?: string | boolean | number
  /** Whether to show progress status output when fetching. */
  'show-progress'?: string | boolean | number
  /** Whether to download Git-LFS files */
  lfs?: string | boolean | number
  /** Whether to checkout submodules: `true` to checkout submodules or `recursive` to recursively checkout submodules.  When the `ssh-key` input is not provided, SSH URLs beginning with `git@github.com:` are converted to HTTPS. */
  submodules?: string | boolean | number
  /** Add repository path as safe.directory for Git global config by running `git config --global --add safe.directory <path>` */
  'set-safe-directory'?: string | boolean | number
  /** The base URL for the GitHub instance that you are trying to clone from, will use environment defaults to fetch from the same instance that the workflow is running from unless specified. Example URLs are https:\/\/github.com or https:\/\/my-ghes-server.example.com */
  'github-server-url'?: string | boolean | number
}

export type ActionsCheckoutV6Outputs = 'ref' | 'commit'

export interface ActionsCheckoutV6Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'actions/checkout@v6'. */
  uses?: 'actions/checkout@v6' | (string & {})
  /** A map of the input parameters defined by the action. */
  with?: ActionsCheckoutV6Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ActionsCheckoutV6 extends BaseAction<
  'actions/checkout@v6',
  ActionsCheckoutV6Outputs
> {
  protected readonly owner = 'actions'
  protected readonly repo = 'checkout'
  protected readonly tag = 'v6'
  protected readonly resolvedVersion = {
    major: 6,
    minor: 0,
    patch: 2,
  }

  constructor(props: ActionsCheckoutV6Props = {}) {
    const outputNames = ['ref', 'commit'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, uses, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: uses ?? 'actions/checkout@v6',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'actions/checkout@v6' },
      outputNames,
    )

    if (uses) {
      this.validateUses()
    }
  }
}
