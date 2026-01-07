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

export interface ActionsCacheV4Props extends Omit<
  GeneratedWorkflowTypes.Step,
  'uses' | 'with'
> {
  with?: ActionsCacheV4Inputs
}

export class ActionsCacheV4 extends BaseAction<ActionsCacheV4Outputs> {
  constructor(props: ActionsCacheV4Props = {}) {
    const outputNames = ['cache-hit'] as const

    super(
      {
        ...props,
        uses: 'actions/cache@v4',
        with: props.with as GeneratedWorkflowTypes.Step['with'],
      },
      outputNames,
    )
  }
}
