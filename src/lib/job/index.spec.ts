import { NormalJob, ReusableWorkflowCallJob } from './'
import { Step } from '../step'

describe('NormalJob', () => {
	describe('addSteps', () => {
		it('should add steps to an existing steps array', () => {
			const stepInstance = new Step({
				name: 'Echo',
				run: 'echo "Hello World"',
			})

			const job = new NormalJob('testJob', {
				'runs-on': 'ubuntu-latest',
				steps: [
					{
						name: 'Checkout',
						uses: 'actions/checkout@v3',
					},
				],
			})

			job.addSteps([stepInstance, stepInstance])

			expect(job.job.steps?.length).toBe(3)
		})

		it('should initialize steps if it does not exist', () => {
			const stepInstance = new Step({
				name: 'Echo',
				run: 'echo "Hello World"',
			})

			const job = new NormalJob('testJob', {
				'runs-on': 'ubuntu-latest',
			})

			job.addSteps([stepInstance])

			expect(job.job.steps?.length).toBe(1)
		})
	})

	describe('addStep', () => {
		it('should add a step to an existing steps array', () => {
			const stepInstance = new Step({
				name: 'Echo',
				run: 'echo "Hello World"',
			})

			const job = new NormalJob('testJob', {
				'runs-on': 'ubuntu-latest',
				steps: [
					{
						name: 'Checkout',
						uses: 'actions/checkout@v3',
					},
				],
			})

			job.addStep(stepInstance)

			expect(job.job.steps?.length).toBe(2)
		})

		it('should initialize steps with a single step if it does not exist', () => {
			const stepInstance = new Step({
				name: 'Echo',
				run: 'echo "Hello World"',
			})

			const job = new NormalJob('testJob', {
				'runs-on': 'ubuntu-latest',
			})

			job.addStep(stepInstance)

			expect(job.job.steps?.length).toBe(1)
		})
	})
})

describe('ReusableWorkflowCallJob', () => {
	it('should construct properly', () => {
		const job = new ReusableWorkflowCallJob('testReusableJob', {
			uses: 'your-org/your-repo/.github/workflows/reusable-workflow.yml@main',
			secrets: 'inherit',
		})

		expect(job.name).toBe('testReusableJob')
		expect(job.job).toEqual({
			uses: 'your-org/your-repo/.github/workflows/reusable-workflow.yml@main',
			secrets: 'inherit',
		})
	})
})
