import { GeneratedWorkflowTypes } from '../types'
import * as Jobs from '../job'

export class Workflow {
  public workflow: Partial<GeneratedWorkflowTypes.Workflow>

  /**
   * The filename of the workflow e.g. `main.yml`
   */
  public filename?: string

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
  ) {
    this.filename = filename
    this.workflow = {
      ...workflowProps,
    }
  }
}
