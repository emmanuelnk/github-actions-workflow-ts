// This file is auto-generated. Do not edit manually.
import { BaseAction } from '../../../base.js'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Cache
 *
 * Cache artifacts like dependencies and build outputs to improve workflow execution time
 *
 * @see https://github.com/actions/cache
 */

export interface ActionsCacheV4Inputs {
  /** A list of files, directories, and wildcard patterns to cache and restore */
  path: string | boolean | number
  /** An explicit key for restoring and saving the cache */
  key: string | boolean | number
  /** An ordered multiline string listing the prefix-matched keys, that are used for restoring stale cache if no cache hit occurred for key. Note `cache-hit` returns false in this case. */
  'restore-keys'?: string | boolean | number
  /** The chunk size used to split up large files during upload, in bytes */
  'upload-chunk-size'?: string | boolean | number
  /** An optional boolean when enabled, allows windows runners to save or restore caches that can be restored or saved respectively on other platforms */
  enableCrossOsArchive?: string | boolean | number
  /** Fail the workflow if cache entry is not found */
  'fail-on-cache-miss'?: string | boolean | number
  /** Check if a cache entry exists for the given input(s) (key, restore-keys) without downloading the cache */
  'lookup-only'?: string | boolean | number
  /** Run the post step to save the cache even if another step before fails
   * @deprecated save-always does not work as intended and will be removed in a future release. A separate `actions\/cache\/restore` step should be used instead. See https:\/\/github.com\/actions\/cache\/tree\/main\/save#always-save-cache for more details. */
  'save-always'?: string | boolean | number
}

export type ActionsCacheV4Outputs = 'cache-hit'

export interface ActionsCacheV4Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /** The action reference. If provided, must match 'actions/cache@v4'. */
  uses?: 'actions/cache@v4' | (`actions/cache@v4.${string}` & {})
  /** A map of the input parameters defined by the action. */
  with?: ActionsCacheV4Inputs
  /** Sets environment variables for this step. */
  env?: Record<string, string | number | boolean>
  /** Set to true to allow a job to pass when this step fails. */
  'continue-on-error'?: boolean | string
  /** The maximum number of minutes to run the step before killing the process. */
  'timeout-minutes'?: number | string
}

export class ActionsCacheV4 extends BaseAction<
  'actions/cache@v4',
  ActionsCacheV4Outputs
> {
  constructor(props: ActionsCacheV4Props = {}) {
    const outputNames = ['cache-hit'] as const

    // Destructure to control property order in output
    const { id, name, with: withProps, env, ...rest } = props

    super(
      {
        ...(name !== undefined && { name }),
        ...(id !== undefined && { id }),
        uses: 'actions/cache@v4',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'actions/cache@v4' },
      outputNames,
    )
  }
}
