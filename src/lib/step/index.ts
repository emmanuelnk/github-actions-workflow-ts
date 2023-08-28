import * as ExtendedWorkflowTypes from '../../types/githubActionsWorkflowExtended'

export class Step {
	public step: ExtendedWorkflowTypes.Step

	constructor(stepProps: ExtendedWorkflowTypes.Step) {
		this.step = {
			...stepProps,
		}
	}
}
