/**
 * Simple Examples
 *
 * This file will create two workflow files in the .github/workflows directory:
 * - simple-1.yml
 * - simple-2.yml
 *
 * IMPORTANT: You have to export the workflow from this file for it to be generated.
 */

import {
	Workflow,
	NormalJob,
	Step,
	expressions as ex,
	ExtendedWorkflowTypes as EWT,
	GeneratedWorkflowTypes as GWT,
} from '../src'

/**
 * Example 1
 *
 * You can use just objects to define the entire workflow and type safety with
 * the help of the ExtendedWorkflowTypes and GeneratedWorkflowTypes types
 */
const nodeSetupStep: EWT.Step = {
	name: 'Setup Node',
	uses: 'actions/setup-node@v3',
	with: {
		'node-version': '18.x',
	},
}

const firstNormalJob: GWT.NormalJob = {
	'runs-on': 'ubuntu-latest',
	'timeout-minutes': 5,
	steps: [
		nodeSetupStep,
		{
			name: 'Echo',
			run: 'echo "Hello, World!"',
		},
	],
}

export const simpleWorkflowOne = new Workflow('simple-1', {
	name: 'Example Workflow',
	on: {
		workflow_dispatch: {},
	},
	jobs: {
		firstJob: firstNormalJob,
	},
})

/**
 * Example 2
 *
 * You can use helper classes too i.e, Step, NormalJob, ReusableWorkflowCallJob etc so
 * you don't have to write the entire workflow in one go and make pieces of code more reusable with type
 * safety without having to import workflow types
 */

const echoStep = new Step({
	name: 'Echo',
	run: 'echo "Hello, World!"',
})

const checkoutStep = new Step({
	name: 'Checkout',
	uses: 'actions/checkout@v3',
	with: {
		ref: 'dev',
	},
})

const stepWithVariable = new Step({
	name: 'Echo Event Name',
	run: 'echo ${{ github.event_name }}',
})

const stepWithOutputHelpers = new Step({
	name: 'Comment on Issue',
	run: 'gh issue comment $ISSUE --body "Thank you for opening this issue!"',
	env: {
		GITHUB_TOKEN: ex.secret('GITHUB_TOKEN'),
		ISSUE: ex.env('ISSUE'),
	},
})

const firstJob = new NormalJob('firstJob', {
	'runs-on': 'ubuntu-latest',
	'timeout-minutes': 5,
}).addSteps([echoStep, checkoutStep])

// Export it to generate it
export const simpleWorkflowTwo = new Workflow('simple-2', {
	name: 'Simple JSON',
	on: { workflow_dispatch: {} },
	jobs: {
		firstJob: firstJob.job,
	},
})

/**
 * Example 3
 */

const secondJob = new NormalJob('secondJob', {
	'runs-on': 'ubuntu-latest',
	'timeout-minutes': 5,
})

secondJob
	.addStep(echoStep)
	.addStep(checkoutStep)
	.addStep(stepWithVariable)
	.addStep(stepWithOutputHelpers)

simpleWorkflowTwo.addJob(firstJob).addJob(secondJob)
