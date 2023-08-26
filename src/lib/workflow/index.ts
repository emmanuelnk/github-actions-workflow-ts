import { GeneratedWorkflowTypes } from "../../types";
import * as Jobs from "../job";

export class Workflow {
  public workflow: Partial<GeneratedWorkflowTypes.Workflow>;
  public filename?: string;

  addJobs(jobs: (Jobs.NormalJob | Jobs.ReusableWorkflowCallJob)[]): this {
    this.workflow.jobs = {
      ...(this.workflow.jobs || {}),
      ...jobs.reduce((acc, job) => ({ ...acc, [`${job.name}`]: job.job }), {}),
    };

    return this;
  }

  addJob(job: Jobs.NormalJob | Jobs.ReusableWorkflowCallJob): this {
    this.workflow.jobs = {
      ...(this.workflow.jobs || {}),
      [`${job.name}`]: job.job,
    };

    return this;
  }

  constructor(
    filename: string,
    workflowProps: Partial<GeneratedWorkflowTypes.Workflow>,
  ) {
    this.filename = filename;
    this.workflow = {
      ...workflowProps,
    };
  }
}
