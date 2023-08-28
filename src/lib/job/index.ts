import { GeneratedWorkflowTypes, ExtendedWorkflowTypes } from '../../types'
import { Step } from '..'

export class NormalJob {
	public name: string
	public job: GeneratedWorkflowTypes.NormalJob
	public steps: ExtendedWorkflowTypes.Step[] = []

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

export class ReusableWorkflowCallJob {
	public name: string
	public job: GeneratedWorkflowTypes.ReusableWorkflowCallJob

	constructor(
		name: string,
		jobProps: GeneratedWorkflowTypes.ReusableWorkflowCallJob,
	) {
		this.name = name
		this.job = jobProps

		return this
	}
}
