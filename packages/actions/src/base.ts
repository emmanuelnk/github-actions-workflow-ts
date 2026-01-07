import { Step } from '@github-actions-workflow-ts/lib'
import type { GeneratedWorkflowTypes } from '@github-actions-workflow-ts/lib'

/**
 * Base class for typed GitHub Actions.
 * Extends the Step class to provide typed inputs and output helpers.
 *
 * @typeParam TUses - Literal string type for the action reference (e.g., 'actions/checkout@v4')
 * @typeParam TOutputs - String literal union of output names
 */
export class BaseAction<
  TUses extends string,
  TOutputs extends string,
> extends Step {
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
  ) {
    super(stepProps)

    // Build the outputs object with expression strings
    this.outputs = {} as Record<TOutputs, string>
    for (const outputName of outputNames) {
      this.outputs[outputName] = this.id
        ? `\${{ steps.${this.id}.outputs.${outputName} }}`
        : ''
    }
  }
}
