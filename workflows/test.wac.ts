import { Workflow, NormalJob, Step } from '../'

const checkout = new Step({
	name: 'Checkout',
	uses: 'actions/checkout@v3',
})

const installNode = new Step({
	name: 'Install Node',
	uses: 'actions/setup-node@v3',
	with: { 'node-version': 18 },
})

const installPnpm = new Step({
	name: 'Install pnpm',
	uses: 'pnpm/action-setup@v2',
	with: { version: 8 },
})

const installDependencies = new Step({
	name: 'Install Dependencies',
	run: 'pnpm install --no-frozen-lockfile',
})

const runTests = new Step({
	name: 'Run Tests',
	run: 'pnpm test',
})

const updateCodeCoverageBadge = new Step({
	name: 'Update Code Coverage Badge',
	if: `github.ref == format('refs/heads/{0}', github.event.repository.default_branch)`,
	uses: 'we-cli/coverage-badge-action@48a2699b2e537c7519bdc970fb0ecd75c80a698e',
})

const testJob = new NormalJob('Tests', {
	'runs-on': 'ubuntu-latest',
}).addSteps([
	checkout,
	installNode,
	installPnpm,
	installDependencies,
	runTests,
	updateCodeCoverageBadge,
])

export const test = new Workflow('test', {
	name: 'Tests',
	on: {
		push: {
			branches: ['**'],
		},
		pull_request: {
			branches: ['main'],
		},
	},
}).addJob(testJob)
