import {
	Workflow,
	NormalJob,
	Step,
	expressions as ex,
	multilineString,
	echoKeyValue,
} from '../src'

const targetCommitish = ex.expn('github.event.release.target_commitish')
const tagName = ex.expn('github.event.release.tag_name')

const checkout = new Step({
	name: 'Checkout',
	uses: 'actions/checkout@v4',
	with: {
		ref: targetCommitish,
	},
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

const installPnpm = new Step({
	name: 'Install pnpm',
	uses: 'pnpm/action-setup@v4',
	with: { version: 8 },
})

const installDependencies = new Step({
	name: 'Install Dependencies',
	run: 'pnpm install --no-frozen-lockfile',
})

const bumpVersion = new Step({
	name: 'Bump Version',
	run: multilineString(
		`git config user.name github-actions`,
		`git config user.email github-actions@github.com`,
		`echo version: ${tagName}`,
		`npm version --no-git-tag-version ${tagName}`,
	),
})

const build = new Step({
	name: 'Run Build',
	run: 'pnpm build',
})

const npmPublish = new Step({
	name: 'Publish to npm',
	run: multilineString(
		echoKeyValue.to(
			'//registry.npmjs.org/:_authToken',
			ex.secret('NPM_TOKEN'),
			'.npmrc',
		),
		'npm publish',
	),
	env: {
		NPM_AUTH_TOKEN: ex.secret('NPM_TOKEN'),
	},
})

const createZDP = new Step({
	name: 'Create Zero Dependency Package',
	run: 'tsx scripts/generateZeroDependencyPackage.ts',
})

const buildZDP = new Step({
	name: 'Build Zero Dependency Package',
	'working-directory': 'github-actions-workflow-ts-lib',
	run: 'npm run build',
})

const npmPublishZDP = new Step({
	name: 'Publish to npm',
	'working-directory': 'github-actions-workflow-ts-lib',
	run: multilineString(
		echoKeyValue.to(
			'//registry.npmjs.org/:_authToken',
			ex.secret('NPM_TOKEN'),
			'.npmrc',
		),
		'npm publish',
	),
	env: {
		NPM_AUTH_TOKEN: ex.secret('NPM_TOKEN'),
	},
})

const publishZeroDependencyPackageJob = new NormalJob(
	'PublishZeroDependencyPackage',
	{
		'runs-on': 'ubuntu-latest',
		'timeout-minutes': 20,
		permissions: {
			contents: 'write',
		},
	},
).addSteps([
	checkout,
	installNode,
	installPnpm,
	installGlobalTsx,
	bumpVersion,
	createZDP,
	buildZDP,
	npmPublishZDP,
])

const publishPackageJob = new NormalJob('PublishPackage', {
	'runs-on': 'ubuntu-latest',
	'timeout-minutes': 20,
	permissions: {
		contents: 'write',
	},
}).addSteps([
	checkout,
	installNode,
	installPnpm,
	installGlobalTsx,
	installDependencies,
	build,
	bumpVersion,
	npmPublish,
])

const commitVersionBumpJob = new NormalJob('CommitVersionBump', {
	'runs-on': 'ubuntu-latest',
	'timeout-minutes': 20,
	needs: [publishPackageJob.name, publishZeroDependencyPackageJob.name],
	permissions: {
		contents: 'write',
	},
}).addSteps([
	new Step({
		name: 'Checkout',
		uses: 'actions/checkout@v4',
		with: {
			ref: 'main',
		},
	}),
	new Step({
		name: 'Push updates to main branch',
		shell: 'bash',
		run: multilineString(
			`git config user.name github-actions`,
			`git config user.email github-actions@github.com`,
			`echo version: ${tagName}`,
			`npm version --no-git-tag-version ${tagName}`,
			`git add .`,
			`git commit -m "new release: ${tagName} 🚀 [skip ci]" --no-verify`,
			`git push origin HEAD:main`,
		),
	}),
])

export const publishWorkflow = new Workflow('publish', {
	name: 'Publish Release',
	on: {
		release: {
			types: ['published'],
		},
	},
}).addJobs([
	publishZeroDependencyPackageJob,
	publishPackageJob,
	commitVersionBumpJob,
])
