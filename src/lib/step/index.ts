import * as ExtendedWorkflowTypes from '../../types/githubActionsWorkflowExtended'

export class Step {
	public step: ExtendedWorkflowTypes.Step

	addEnvs(envs: ExtendedWorkflowTypes.Step['env']): this {
		if (this.step.env && typeof this.step.env === 'object')
			this.step.env = {
				...(this.step.env as { [k: string]: string | number | boolean }),
				...(envs as { [k: string]: string | number | boolean }),
			}
		else this.step.env = envs

		return this
	}

	constructor(stepProps: ExtendedWorkflowTypes.Step) {
		this.step = {
			...stepProps,
		}
	}
}
