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
	uses: 'actions/checkout@v3',
	with: {
		ref: targetCommitish,
	},
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

const bumpVersion = new Step({
	name: 'Bump Version',
	run: multilineString(
		`git config user.name github-actions`,
		`git config user.email github-actions@github.com`,
		`echo version: ${tagName}`,
		`npm version ${tagName}`,
	),
})

const runBuild = new Step({
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

const gitStatus = new Step({
	name: 'Check git status',
	shell: 'bash',
	run: 'git status',
})

const gitAdd = new Step({
	name: 'Add files to commit',
	shell: 'bash',
	run: 'git add .',
})

const gitCommit = new Step({
	name: 'Commit changes',
	shell: 'bash',
	run: `git commit --no-verify -m "Release ${tagName}"`,
})

const gitPushCommit = new Step({
	name: 'Push updates to GitHub',
	shell: 'bash',
	run: `git push origin HEAD:${targetCommitish}`,
})

const gitTag = new Step({
	name: 'Create tag',
	shell: 'bash',
	run: `git tag --force ${tagName}`,
})

const gitPushTag = new Step({
	name: 'Push tag to GitHub',
	shell: 'bash',
	run: `git push --force origin ${targetCommitish}`,
})

const publishJob = new NormalJob('Publish', {
	'runs-on': 'ubuntu-latest',
	'timeout-minutes': 20,
	permissions: {
		contents: 'write',
	},
}).addSteps([
	checkout,
	installNode,
	installPnpm,
	installDependencies,
	runBuild,
	bumpVersion,
	npmPublish,
	gitStatus,
	gitAdd,
	gitStatus,
	gitCommit,
	gitPushCommit,
	gitStatus,
	gitTag,
	gitPushTag,
])

export const publishWorkflow = new Workflow('publish', {
	name: 'Publish Release',
	on: {
		release: {
			types: ['published'],
		},
	},
}).addJob(publishJob)
