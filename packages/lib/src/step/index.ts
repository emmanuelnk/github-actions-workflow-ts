import type { GeneratedWorkflowTypes } from '../types/index.js'

/**
 * Represents a single step within a GitHub Actions job.
 *
 * A Step can either run a shell command (`run`) or use a GitHub Action (`uses`).
 * Steps execute sequentially within a job.
 *
 * @example
 * ```typescript
 * // Run a shell command
 * const testStep = new Step({ name: 'Run tests', run: 'npm test' })
 *
 * // Use a GitHub Action
 * const checkoutStep = new Step({ name: 'Checkout', uses: 'actions/checkout@v4' })
 * ```
 */
export class Step {
  public step: GeneratedWorkflowTypes.Step
  public id: string | undefined

  addEnvs(envs: GeneratedWorkflowTypes.Step['env']): this {
    if (this.step.env && typeof this.step.env === 'object')
      this.step.env = {
        ...(this.step.env as {
          [k: string]: string | number | boolean
        }),
        ...(envs as { [k: string]: string | number | boolean }),
      }
    else this.step.env = envs

    return this
  }

  constructor(stepProps: GeneratedWorkflowTypes.Step) {
    this.step = {
      ...stepProps,
    }
    this.id = stepProps.id
  }
}
