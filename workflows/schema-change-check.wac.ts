import { Workflow, NormalJob, Step, multilineString } from '../src'

const checkout = new Step({
	name: 'Checkout',
	uses: 'actions/checkout@v4',
})

const installNode = new Step({
	name: 'Install Node',
	uses: 'actions/setup-node@v4',
	with: { 'node-version': 18 },
})

const installGlobalTsx = new Step({
	name: 'Install tsx',
	run: 'npm install -g tsx',
})

const generateWorkflowTypes = new Step({
	name: 'Generate Workflow Types',
	run: 'tsx scripts/generateWorkflowTypes.ts',
})

const gitDiff = new Step({
	name: 'Get git diff',
	run: 'git diff',
})

const isGitDiffEmpty = new Step({
	name: 'Fail if git diff is not empty',
	run: multilineString(
		`if test -z "$(git diff --name-only)"; then`,
		`  echo "No file changes detected."`,
		`  exit 0`,
		`else`,
		`  echo "File changes detected."`,
		`  exit 1`,
		`fi`,
	),
})

const schemaChangeCheck = new NormalJob('SchemaChangeCheck', {
	'runs-on': 'ubuntu-latest',
	permissions: {
		contents: 'write',
	},
}).addSteps([
	checkout,
	installNode,
	installGlobalTsx,
	generateWorkflowTypes,
	gitDiff,
	isGitDiffEmpty,
])

export const schemaChangeCheckWorkflow = new Workflow('schema-change-check', {
	name: 'Schema Change Check',
	on: {
		push: {
			branches: ['**'],
		},
		schedule: [{ cron: '0 0 * * *' }],
	},
}).addJob(schemaChangeCheck)
