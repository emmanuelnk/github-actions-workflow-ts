import { Workflow, NormalJob, Step, expressions as ex } from '../src'

const draftStep = new Step({
	name: 'Draft next release',
	uses: 'release-drafter/release-drafter@v5',
	env: {
		GITHUB_TOKEN: ex.secret('GITHUB_TOKEN'),
	},
})

const draftJob = new NormalJob('UpdateReleaseDraft', {
	'runs-on': 'ubuntu-latest',
	'timeout-minutes': 20,
	permissions: {
		contents: 'write',
	},
}).addStep(draftStep)

export const draftWorkflow = new Workflow('draft', {
	name: 'Draft Release',
	on: {
		push: {
			branches: ['main'],
		},
		pull_request: {
			types: ['opened', 'reopened', 'synchronize'],
		},
	},
	permissions: {
		contents: 'read',
	},
}).addJob(draftJob)
