import fs from 'fs'
import path from 'path'

const packageJson = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'),
)

const newPackageJson = {
	name: `${packageJson.name}-lib`,
	version: packageJson.version,
	author: packageJson.author,
	description: packageJson.description,
	repository: packageJson.repository,
	license: packageJson.license,
	main: 'build/index',
	types: 'build/index',
	files: ['build'],
	scripts: {
		build: 'tsc -p tsconfig.build.json',
	},
}

fs.mkdirSync(path.resolve(__dirname, '../github-actions-workflow-ts-lib/src'), {
	recursive: true,
})

// copy needed files
;[
	{
		from: '../src/lib',
		to: '../github-actions-workflow-ts-lib/src',
	},
	{
		from: '../tsconfig.json',
		to: '../github-actions-workflow-ts-lib/tsconfig.json',
	},
	{
		from: '../tsconfig.build.json',
		to: '../github-actions-workflow-ts-lib/tsconfig.build.json',
	},
	{
		from: '../LICENSE',
		to: '../github-actions-workflow-ts-lib/LICENSE',
	},
].forEach(({ from, to }) => {
	fs.cpSync(path.resolve(__dirname, from), path.resolve(__dirname, to), {
		recursive: true,
	})
})

// write new package.json
fs.writeFileSync(
	path.resolve(__dirname, '../github-actions-workflow-ts-lib/package.json'),
	JSON.stringify(newPackageJson, null, 2),
)

// write new README.md content
fs.writeFileSync(
	path.resolve(__dirname, '../github-actions-workflow-ts-lib/README.md'),
	`# github-actions-workflow-ts-lib

This is a zero-dependency version of [github-actions-workflow-ts](https://github.com/emmanuelnk/github-actions-workflow-ts).
`,
)
