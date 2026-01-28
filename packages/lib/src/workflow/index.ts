import type { GeneratedWorkflowTypes } from '../types/index.js'
import type * as Jobs from '../job/index.js'

/**
 * Options for configuring a Workflow instance.
 */
export type WorkflowOptions = {
  /**
   * Custom output path for this workflow.
   * If specified, takes precedence over config file settings.
   * Can be a relative or absolute path to the output directory.
   * @example "packages/app-a/.github/workflows"
   */
  outputPath?: string
}

/**
 * Represents a GitHub Actions workflow.
 *
 * The Workflow class is the top-level container for defining a GitHub Actions workflow.
 * It allows you to configure workflow triggers, add jobs, and set environment variables.
 *
 * @example
 * ```typescript
 * const workflow = new Workflow('ci', {
 *   name: 'CI',
 *   on: { push: { branches: ['main'] } },
 * })
 * workflow.addJob(testJob)
 * ```
 *
 * @example
 * ```typescript
 * // With custom output path
 * const workflow = new Workflow('deploy', {
 *   name: 'Deploy',
 *   on: { push: { branches: ['main'] } },
 * }, { outputPath: 'packages/app-a/.github/workflows' })
 * ```
 */
export class Workflow {
  public workflow: Partial<GeneratedWorkflowTypes.Workflow>

  /**
   * The filename of the workflow e.g. `main.yml`
   */
  public filename?: string

  /**
   * Custom output path for this workflow.
   * If set, overrides any config file settings.
   */
  public outputPath?: string

  addEnvs(envs: GeneratedWorkflowTypes.Workflow['env']): this {
    if (this.workflow.env && typeof this.workflow.env === 'object')
      this.workflow.env = {
        ...(this.workflow.env as {
          [k: string]: string | number | boolean
        }),
        ...(envs as { [k: string]: string | number | boolean }),
      }
    else this.workflow.env = envs

    return this
  }

  addJobs(jobs: (Jobs.NormalJob | Jobs.ReusableWorkflowCallJob)[]): this {
    this.workflow.jobs = {
      ...(this.workflow.jobs || {}),
      ...jobs.reduce((acc, job) => ({ ...acc, [`${job.name}`]: job.job }), {}),
    }

    return this
  }

  addJob(job: Jobs.NormalJob | Jobs.ReusableWorkflowCallJob): this {
    this.workflow.jobs = {
      ...(this.workflow.jobs || {}),
      [`${job.name}`]: job.job,
    }

    return this
  }

  constructor(
    filename: string,
    workflowProps: Partial<GeneratedWorkflowTypes.Workflow>,
    options?: WorkflowOptions,
  ) {
    this.filename = filename
    this.workflow = {
      ...workflowProps,
    }
    this.outputPath = options?.outputPath
  }
}
