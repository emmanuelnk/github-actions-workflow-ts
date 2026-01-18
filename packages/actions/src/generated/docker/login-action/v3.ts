// This file is auto-generated. Do not edit manually.
import { BaseAction, type SuppressableDiagnosticCode } from '../../../base.js'
import {
  Diagnostics,
  type GeneratedWorkflowTypes,
} from '@github-actions-workflow-ts/lib'

/**
 * Docker Login
 *
 * GitHub Action to login against a Docker registry
 *
 * @see https://github.com/docker/login-action
 */

export interface DockerLoginActionV3Inputs {
  /** Server address of Docker registry. If not set then will default to Docker Hub */
  registry?: string | boolean | number
  /** Username used to log against the Docker registry */
  username?: string | boolean | number
  /** Password or personal access token used to log against the Docker registry */
  password?: string | boolean | number
  /** Specifies whether the given registry is ECR (auto, true or false) */
  ecr?: string | boolean | number
  /** Log out from the Docker registry at the end of a job
   * @default true */
  logout?: string | boolean | number
  /** Raw authentication to registries, defined as YAML objects */
  'registry-auth'?: string | boolean | number
}

export type DockerLoginActionV3Outputs = never

export interface DockerLoginActionV3Props {
  /** A unique identifier for the step. */
  id?: string
  /** Prevents the step from running unless a condition is met. */
  if?: boolean | number | string
  /** A name for your step to display on GitHub. */
  name?: string
  /**
   * The action reference. If provided, must match 'docker/login-action@v3'.
   * Can be wrapped with Diagnostics.suppress() to suppress specific warnings.
   */
  uses?:
    | 'docker/login-action@v3'
    | (string & {})
    | Diagnostics.SuppressedValue<string>
  /** A map of the input parameters defined by the action. */
  with?: DockerLoginActionV3Inputs
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

export class DockerLoginActionV3 extends BaseAction<
  'docker/login-action@v3',
  DockerLoginActionV3Outputs
> {
  protected readonly owner = 'docker'
  protected readonly repo = 'login-action'
  protected readonly tag = 'v3'
  protected readonly resolvedVersion = {
    major: 3,
    minor: 6,
    patch: 0,
  }

  constructor(props: DockerLoginActionV3Props = {}) {
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
        uses: unwrappedUses ?? 'docker/login-action@v3',
        ...(withProps !== undefined && { with: withProps }),
        ...(env !== undefined && { env }),
        ...rest,
      } as GeneratedWorkflowTypes.Step & { uses: 'docker/login-action@v3' },
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
