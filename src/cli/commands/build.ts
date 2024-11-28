import * as fs from 'fs'
import * as path from 'path'
import * as jsYaml from 'js-yaml'
import * as fg from 'fast-glob'
import * as tsNode from 'ts-node'
import { Workflow } from '../../lib'
import { BuildTypes } from '../commands/types'

/**
 * Comment indicating the file should not be modified.
 * @type {string}
 */
export const DEFAULT_HEADER_TEXT = [
	'# ------------DO-NOT-MODIFY-THIS-FILE------------',
	'# This file was automatically generated by github-actions-workflow-ts.',
	'# Instead, modify <source-file-path>',
	'# ------------DO-NOT-MODIFY-THIS-FILE------------',
]

/**
 * Flag to track if tsNode is registered.
 * @type {boolean}
 */
let tsNodeRegistered = false

/**
 * Convert an absolute path to a relative path from the current working directory.
 *
 * @param {string} p - The absolute path.
 * @returns {string} - Relative path from the current working directory.
 */
export const relativePath = (p: string): string =>
	path.relative(process.cwd(), p)

/**
 * Registers ts-node if it hasn't been registered.
 *
 * @param {object} [options={}] - Options for ts-node registration.
 */
export const registerTsNode = (options = {}): void => {
	if (tsNodeRegistered) return

	tsNode.register({ ...options })
	tsNodeRegistered = true
}

/**
 * Returns the config file
 * @returns { Record<string, any> | undefined} - The config file as an object
 */
export const getConfig = (): BuildTypes.WacConfig | undefined => {
	const configFilePath = path.join(process.cwd(), 'wac.config.json')

	if (!fs.existsSync(configFilePath)) {
		console.log(
			'[github-actions-workflow-ts] No config (wac.config.json) file found in root dir. Using default config.',
		)

		return undefined
	}

	console.log(
		'[github-actions-workflow-ts] wac.config.json config file found in root dir',
	)

	return JSON.parse(fs.readFileSync(configFilePath, 'utf-8'))
}

/**
 * Retrieves the file paths of all workflow files in the project.
 *
 * @returns {string[] | undefined} - Array of paths to *.wac.ts files or undefined if none are found.
 */
export const getWorkflowFilePaths = (): string[] | undefined => {
	const workflowFilesPaths = fg.sync(`${process.cwd()}/**/*.wac.ts`, {
		onlyFiles: true,
		dot: true,
	})

	if (!workflowFilesPaths || !workflowFilesPaths.length) {
		console.log(
			'[github-actions-workflow-ts] No workflow files found. Please create at least one *.wac.ts file in your project',
		)

		return
	}

	const workflowFileList = workflowFilesPaths
		.map((item) => `[github-actions-workflow-ts] --> ${relativePath(item)}`)
		.join('\n')

	console.log(
		`[github-actions-workflow-ts] Detected following .wac.ts files:\n${workflowFileList}`,
	)

	return workflowFilesPaths
}

/**
 * Writes the provided workflow JSON data to corresponding YAML files.
 *
 * @param {Record<string, Workflow>} workflowJSON - The workflow data in JSON format.
 * @param {string} workflowFilePath - The path to the workflow file.
 * @param {BuildTypes.WacConfig} config - Command line arguments.
 * @returns {number} - The number of workflows written.
 */
export const writeWorkflowJSONToYamlFiles = (
	workflowJSON: Record<string, Workflow>,
	workflowFilePath: string,
	config: BuildTypes.WacConfig,
): number => {
	let workflowCount: number = 0

	for (const workflowName in workflowJSON) {
		const workflowYaml = jsYaml.dump(workflowJSON[workflowName].workflow, {
			noRefs: !config.refs,
			...(config.dumpOptions || {}),
		})

		const yamlWorkflowPath = path.join(
			'.github',
			'workflows',
			`${workflowJSON[workflowName].filename}.yml`,
		)

		console.log(
			`[github-actions-workflow-ts] Writing to ${relativePath(yamlWorkflowPath)}:`,
		)

		const headerText = (config.headerText || DEFAULT_HEADER_TEXT)
			.join('\n')
			.replace('<source-file-path>', workflowFilePath)

		fs.writeFileSync(yamlWorkflowPath, [headerText, workflowYaml].join('\n'))

		workflowCount++
	}

	return workflowCount
}

/**
 * Creates the .github/workflows directory if it doesn't exist.
 */
export const createWorkflowDirectory = (): void => {
	const workflowsDir = relativePath(path.join('.github', 'workflows'))

	if (!fs.existsSync(workflowsDir)) {
		console.log(
			'[github-actions-workflow-ts] .github/workflows directory not found. Creating it.',
		)
		fs.mkdirSync(workflowsDir, { recursive: true })
	}
}

/**
 * Generates workflow files based on the provided command line arguments.
 *
 * @param {Record<string, unknown>} argv - Command line arguments.
 * @returns {Promise<void>} - A promise that resolves when the generation is completed.
 */
export const generateWorkflowFiles = async (
	argv: Record<string, unknown>,
): Promise<void> => {
	const config = getConfig() || {}
	const workflowFilePaths = getWorkflowFilePaths() || []
	let workflowCount = 0

	createWorkflowDirectory()

	for (const idx in workflowFilePaths) {
		workflowCount += writeWorkflowJSONToYamlFiles(
			await import(workflowFilePaths[idx]),
			relativePath(workflowFilePaths[idx]),
			{
				...argv,
				...config,
			} as BuildTypes.WacConfig,
		)
	}

	console.log(
		`[github-actions-workflow-ts] Successfully generated ${workflowCount} workflow file(s)`,
	)
}