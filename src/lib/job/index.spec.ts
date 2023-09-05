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

	describe('addEnvs', () => {
		it('should add environment variables to an existing env object', () => {
			const job = new NormalJob('testJob', {
				'runs-on': 'ubuntu-latest',
				env: { existingKey: 'existingValue' },
			})

			job.addEnvs({ newKey: 'newValue' })

			expect(job.job.env).toEqual({
				existingKey: 'existingValue',
				newKey: 'newValue',
			})
		})

		it('should initialize env object if it does not exist', () => {
			const job = new NormalJob('testJob', {
				'runs-on': 'ubuntu-latest',
			})

			job.addEnvs({ newKey: 'newValue' })

			expect(job.job.env).toEqual({ newKey: 'newValue' })
		})
	})

	describe('needs()', () => {
		it("should add jobs to an empty job's needs", () => {
			const job1 = new NormalJob('job1', {
				'runs-on': 'ubuntu-latest',
			})

			const job2 = new ReusableWorkflowCallJob('job2', {
				uses: 'your-org/your-repo/.github/workflows/reusable-workflow.yml@main',
			})

			const targetJob = new NormalJob('target', {
				'runs-on': 'ubuntu-latest',
			})

			targetJob.needs([job1, job2])

			expect(targetJob.job.needs).toEqual(['job1', 'job2'])
		})

		it("should add jobs to an existing job's needs", () => {
			const job1 = new NormalJob('job1', {
				'runs-on': 'ubuntu-latest',
			})

			const job2 = new ReusableWorkflowCallJob('job2', {
				uses: 'your-org/your-repo/.github/workflows/reusable-workflow.yml@main',
			})

			const targetJob = new NormalJob('target', {
				'runs-on': 'ubuntu-latest',
				needs: ['initialJob'],
			})

			targetJob.needs([job1, job2])

			expect(targetJob.job.needs).toEqual(['initialJob', 'job1', 'job2'])
		})

		it('should handle a mix of NormalJob and ReusableWorkflowCallJob types', () => {
			const job1 = new NormalJob('job1', {
				'runs-on': 'ubuntu-latest',
			})

			const job2 = new ReusableWorkflowCallJob('job2', {
				uses: 'your-org/your-repo/.github/workflows/reusable-workflow.yml@main',
			})

			const job3 = new NormalJob('job3', {
				'runs-on': 'ubuntu-latest',
			})
			const targetJob = new NormalJob('target', {
				'runs-on': 'ubuntu-latest',
			})

			targetJob.needs([job1, job2, job3])

			expect(targetJob.job.needs).toEqual(['job1', 'job2', 'job3'])
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
