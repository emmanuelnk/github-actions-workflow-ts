import { Step } from '@github-actions-workflow-ts/lib'
import {
  type GeneratedWorkflowTypes,
  Context,
  Diagnostics,
} from '@github-actions-workflow-ts/lib'
import {
  isCompatibleVersion,
  isFullSemver,
  parsePartialVersion,
  type PartialSemver,
  type Semver,
} from './utils.js'

/**
 * Diagnostic codes that can be suppressed.
 */
export type SuppressableDiagnosticCode =
  | 'action-version-unverifiable'
  | 'action-version-semver-violation'

/**
 * Base class for typed GitHub Actions.
 * Extends the Step class to provide typed inputs and output helpers.
 *
 * @typeParam TUses - Literal string type for the action reference (e.g., 'actions/checkout@v4')
 * @typeParam TOutputs - String literal union of output names
 */
export abstract class BaseAction<
  TUses extends string,
  TOutputs extends string,
> extends Step {
  protected abstract readonly owner: string
  protected abstract readonly repo: string
  protected abstract readonly tag: string
  protected abstract readonly resolvedVersion: PartialSemver

  /**
   * Diagnostic codes to suppress for this action instance.
   * Set via the `suppressWarnings` prop or extracted from `Diagnostics.suppress()` wrapped values.
   */
  protected suppressedCodes: Set<string> = new Set()

  /**
   * The step configuration with strongly-typed `uses` field.
   */
  declare readonly step: GeneratedWorkflowTypes.Step & { uses: TUses }

  /**
   * Typed outputs object. Each key maps to the expression string
   * that references that output (e.g., `${{ steps.id.outputs.result }}`).
   *
   * Note: Outputs are only available if the step has an `id` set.
   */
  readonly outputs: Record<TOutputs, string>

  constructor(
    stepProps: GeneratedWorkflowTypes.Step & { uses: TUses },
    outputNames: readonly TOutputs[],
    suppressWarnings?: SuppressableDiagnosticCode[],
  ) {
    super(stepProps)

    // Initialize suppressed codes from the suppressWarnings array
    if (suppressWarnings) {
      for (const code of suppressWarnings) {
        this.suppressedCodes.add(code)
      }
    }

    // Build the outputs object with expression strings
    this.outputs = {} as Record<TOutputs, string>
    for (const outputName of outputNames) {
      this.outputs[outputName] = this.id
        ? `\${{ steps.${this.id}.outputs.${outputName} }}`
        : ''
    }
  }

  /**
   * Adds suppressed codes from a potentially wrapped value.
   * Call this when processing values that may be wrapped with Diagnostics.suppress().
   */
  protected addSuppressionsFromValue<T>(
    value: T | Diagnostics.SuppressedValue<T>,
  ): T {
    if (Diagnostics.isSuppressedValue(value)) {
      for (const suppression of value.suppressions) {
        this.suppressedCodes.add(suppression.code)
      }
      return value.value
    }
    return value
  }

  /**
   * Checks if a diagnostic code is suppressed for this action instance.
   */
  protected isCodeSuppressed(code: string): boolean {
    return this.suppressedCodes.has(code)
  }

  protected validateUses(): boolean {
    const ref = this.extractUsesRef()

    if (!ref) {
      return false
    }

    return this.validateUsesRef(ref)
  }

  private extractUsesRef(): string | null {
    if (!this.step.uses.startsWith(`${this.owner}/${this.repo}@`)) {
      if (!this.isCodeSuppressed('action-version-unverifiable')) {
        Context.getGlobalWacContext()?.diagnostics.emit({
          severity: Diagnostics.DiagnosticSeverity.WARN,
          code: 'action-version-unverifiable',
          message: `Cannot verify the version of action '${this.step.uses}' because the repository specifier does not match '${this.owner}/${this.repo}'.`,
          stack: this.generateStackTrace(),
          action: this.step.uses,
        })
      }
      return null
    }

    return this.step.uses.replace(`${this.owner}/${this.repo}@`, '')
  }

  private validateUsesRef(ref: string): boolean {
    const version = parsePartialVersion(ref)

    if (version === null) {
      if (!this.isCodeSuppressed('action-version-unverifiable')) {
        Context.getGlobalWacContext()?.diagnostics.emit({
          severity: Diagnostics.DiagnosticSeverity.WARN,
          code: 'action-version-unverifiable',
          message: `Cannot verify the version of action '${this.step.uses}' because the git ref is not a valid semver version.`,
          stack: this.generateStackTrace(),
          action: this.step.uses,
        })
      }
      return false
    }

    if (isFullSemver(this.resolvedVersion)) {
      return this.validateUsesSemverConstraint(this.resolvedVersion, version)
    }

    // If we don't know the exact version used to generate the action, then we can't validate it.
    return true
  }

  private validateUsesSemverConstraint(
    requiredVersion: Semver,
    actualVersion: PartialSemver,
  ): boolean {
    if (!isCompatibleVersion(requiredVersion, actualVersion)) {
      if (!this.isCodeSuppressed('action-version-semver-violation')) {
        Context.getGlobalWacContext()?.diagnostics.emit({
          severity: Diagnostics.DiagnosticSeverity.WARN,
          code: 'action-version-semver-violation',
          message: `The version of action '${this.step.uses}' does not satisfy the semver constraint '^${requiredVersion.major}.${requiredVersion.minor ?? 0}.${requiredVersion.patch ?? 0}'.`,
          stack: this.generateStackTrace(),
          action: this.step.uses,
        })
      }
      return false
    }
    return true
  }

  private generateStackTrace(): string {
    return Diagnostics.generateStackTrace(this.constructor)
  }
}
