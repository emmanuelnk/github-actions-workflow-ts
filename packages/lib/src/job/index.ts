import type { GeneratedWorkflowTypes } from '../types/index.js'
import type { Step } from '../step/index.js'

/**
 * Represents a standard GitHub Actions job that runs on a specified runner.
 *
 * A NormalJob contains steps that execute commands or actions on a runner.
 * Jobs can depend on other jobs using the `needs` method.
 *
 * @example
 * ```typescript
 * const testJob = new NormalJob('test', {
 *   'runs-on': 'ubuntu-latest',
 * })
 * testJob.addStep(new Step({ name: 'Checkout', uses: 'actions/checkout@v4' }))
 * ```
 */
export class NormalJob {
  public name: string
  public job: GeneratedWorkflowTypes.NormalJob
  public steps: GeneratedWorkflowTypes.Step[] = []

  addEnvs(envs: GeneratedWorkflowTypes.NormalJob['env']): this {
    if (this.job.env && typeof this.job.env === 'object')
      this.job.env = {
        ...(this.job.env as { [k: string]: string | number | boolean }),
        ...(envs as { [k: string]: string | number | boolean }),
      }
    else this.job.env = envs

    return this
  }

  addSteps(steps: Step[]): this {
    if (this.job.steps?.length)
      this.job.steps = [...this.job.steps, ...steps.map((step) => step.step)]
    else (this.job.steps as unknown[]) = steps.map((step) => step.step)

    return this
  }

  addStep(step: Step): this {
    if (this.job.steps?.length) this.job.steps = [...this.job.steps, step.step]
    else (this.job.steps as unknown[]) = [step.step]

    return this
  }

  needs(jobs: (NormalJob | ReusableWorkflowCallJob)[]): this {
    if (this.job.needs?.length)
      this.job.needs = [
        ...this.job.needs,
        ...jobs.map((job) => job.name as GeneratedWorkflowTypes.Name),
      ] as GeneratedWorkflowTypes.JobNeeds
    else
      (this.job.needs as GeneratedWorkflowTypes.JobNeeds) = jobs.map(
        (job) => job.name as GeneratedWorkflowTypes.Name,
      ) as GeneratedWorkflowTypes.JobNeeds

    return this
  }

  constructor(name: string, jobProps: GeneratedWorkflowTypes.NormalJob) {
    this.name = name
    this.job = jobProps
  }
}

/**
 * Represents a job that calls a reusable workflow.
 *
 * A ReusableWorkflowCallJob allows you to call another workflow file,
 * either from the same repository or an external repository.
 *
 * @example
 * ```typescript
 * const deployJob = new ReusableWorkflowCallJob('deploy', {
 *   uses: './.github/workflows/deploy.yml',
 *   with: { environment: 'production' },
 * })
 * ```
 */
export class ReusableWorkflowCallJob {
  public name: string
  public job: GeneratedWorkflowTypes.ReusableWorkflowCallJob

  needs(jobs: (NormalJob | ReusableWorkflowCallJob)[]): this {
    if (this.job.needs?.length)
      this.job.needs = [
        ...this.job.needs,
        ...jobs.map((job) => job.name as GeneratedWorkflowTypes.Name),
      ] as GeneratedWorkflowTypes.JobNeeds
    else
      (this.job.needs as GeneratedWorkflowTypes.JobNeeds) = jobs.map(
        (job) => job.name as GeneratedWorkflowTypes.Name,
      ) as GeneratedWorkflowTypes.JobNeeds

    return this
  }

  constructor(
    name: string,
    jobProps: GeneratedWorkflowTypes.ReusableWorkflowCallJob,
  ) {
    this.name = name
    this.job = jobProps

    return this
  }
}
