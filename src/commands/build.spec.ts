import * as tsNode from 'ts-node'
import * as build from './build'
import * as fs from 'fs'
import * as path from 'path'
import * as jsYaml from 'js-yaml'
import { Workflow, BuildTypes } from '..'

jest.mock('fs')
jest.mock('path')
jest.mock('js-yaml')
jest.mock('ts-node')

describe('build', () => {
	let consoleLogSpy: jest.SpyInstance
	let consoleErrorSpy: jest.SpyInstance

	beforeEach(() => {
		consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
		consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
	})

	afterEach(() => {
		consoleLogSpy.mockRestore()
		consoleErrorSpy.mockRestore()
	})

	describe('relativePath', () => {
		beforeEach(() => {
			jest.resetAllMocks()
		})

		it('calls path.relative with correct arguments', () => {
			const mockCwd = '/mock/absolute/path'
			const mockAbsolutePath = '/mock/absolute/path/to/file.txt'
			const mockRelativePath = 'to/file.txt'
			const relativePathSpy = jest
				.spyOn(path, 'relative')
				.mockReturnValue(mockRelativePath)
			jest.spyOn(process, 'cwd').mockReturnValue(mockCwd)

			const result = build.relativePath(mockAbsolutePath)

			expect(relativePathSpy).toHaveBeenCalledWith(mockCwd, mockAbsolutePath)
			expect(result).toBe(mockRelativePath)
		})
	})

	describe('getConfig', () => {
		afterEach(() => {
			jest.clearAllMocks()
		})

		it('should return undefined if wac.config.json does not exist', () => {
			jest.spyOn(fs, 'existsSync').mockReturnValue(false)
			const result = build.getConfig()

			expect(result).toBeUndefined()
			expect(consoleLogSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] No config (wac.config.json) file found in root dir. Using default config.',
			)
		})

		it('should return the config object if wac.config.json exists', () => {
			const mockConfig = JSON.stringify({ key: 'value' })
			jest.spyOn(fs, 'existsSync').mockReturnValue(true)
			jest.spyOn(fs, 'readFileSync').mockReturnValue(mockConfig)
			jest.spyOn(path, 'join').mockReturnValue('some/fake/path/wac.config.json')

			const result = build.getConfig()

			expect(result).toEqual({ key: 'value' })
			expect(consoleLogSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] wac.config.json config file found in root dir',
			)
		})

		it('should throw an error if the config file contains invalid JSON', () => {
			jest.spyOn(fs, 'existsSync').mockReturnValue(true)
			jest.spyOn(fs, 'readFileSync').mockReturnValue('invalid JSON')
			jest.spyOn(path, 'join').mockReturnValue('some/fake/path/wac.config.json')

			// Run getConfig and test that it throws an error
			expect(() => build.getConfig()).toThrow()
		})
	})

	describe('registerTsNode', () => {
		let registerSpy: jest.SpyInstance

		beforeEach(() => {
			registerSpy = jest.spyOn(tsNode, 'register').mockImplementation()
		})

		afterEach(() => {
			registerSpy.mockRestore()
		})

		it('should register ts-node with options', () => {
			const options = { transpileOnly: true }
			build.registerTsNode(options)
			expect(registerSpy).toHaveBeenCalledWith(options)
		})

		it('should not register ts-node if it has been already registered', () => {
			build.registerTsNode()
			expect(registerSpy).toHaveBeenCalledTimes(0)
		})
	})

	describe('getWorkflowPaths', () => {
		afterEach(() => {
			jest.clearAllMocks()
		})

		it('should return undefined and log message if no workflow files are found', () => {
			const fg = require('fast-glob')
			jest.doMock('fast-glob')
			jest.spyOn(fg, 'sync').mockReturnValue([])
			const result = build.getWorkflowFilePaths()

			expect(result).toBeUndefined()
			expect(consoleLogSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] No workflow files found. Please create at least one *.wac.ts file in your project',
			)

			jest.dontMock('fast-glob')
		})

		it('should return workflow files paths and log message', () => {
			const fg = require('fast-glob')
			jest.doMock('fast-glob')
			jest.spyOn(fg, 'sync').mockReturnValue(['.github/workflows/test.wac.ts'])
			jest
				.spyOn(build, 'relativePath')
				.mockReturnValue('.github/workflows/test.wac.ts')
			const result = build.getWorkflowFilePaths()

			expect(result).toEqual(['.github/workflows/test.wac.ts'])
			expect(consoleLogSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] Detected following .wac.ts files:\n[github-actions-workflow-ts] --> .github/workflows/test.wac.ts',
			)

			jest.dontMock('fast-glob')
		})
	})

	describe('createWorkflowDirectory', () => {
		afterEach(() => {
			jest.clearAllMocks()
		})

		it('should create .github/workflows directory if it does not exist', () => {
			const fsMkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockReturnValue(undefined)
			jest.spyOn(fs, 'existsSync').mockReturnValue(false)
			jest.spyOn(path, 'join').mockReturnValue('some/fake/path')
			jest.spyOn(path, 'relative').mockReturnValue('some/fake/path')

			build.createWorkflowDirectory()

			expect(fsMkdirSyncSpy).toHaveBeenCalledWith(expect.any(String), {
				recursive: true,
			})
			expect(consoleLogSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] .github/workflows directory not found. Creating it.',
			)
		})

		it('should not create .github/workflows directory if it already exists', () => {
			const fsMkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockReturnValue(undefined)
			jest.spyOn(fs, 'existsSync').mockReturnValue(true)
			jest.spyOn(path, 'join').mockReturnValue('some/fake/path')
			jest.spyOn(path, 'relative').mockReturnValue('some/fake/path')

			build.createWorkflowDirectory()

			expect(fsMkdirSyncSpy).not.toHaveBeenCalled()
			expect(consoleLogSpy).not.toHaveBeenCalled()
		})
	})

	describe('importing of *.wac.ts files', () => {
		it('should import TS file and return its exported workflows', async () => {
			const fg = require('fast-glob')
			jest.doMock('fast-glob')

			const fgSyncSpy = jest
				.spyOn(fg, 'sync')
				.mockReturnValue(['./__mocks__/test.wac.ts'])

			build.registerTsNode()
			const workflowFilePaths = (await build.getWorkflowFilePaths()) as string[]

			const jsonToConvertToYaml = await import(workflowFilePaths[0])

			expect(jsonToConvertToYaml).toEqual({
				test: new Workflow('mock-test', {
					name: 'ExampleMockTests',
					on: {
						workflow_dispatch: {},
					},
					jobs: {
						Test: {
							'runs-on': 'ubuntu-latest',
							steps: [
								{
									name: 'Checkout',
									uses: 'actions/checkout@v3',
								},
								{
									name: 'Install Node',
									uses: 'actions/setup-node@v3',
									with: { 'node-version': 18 },
								},
								{
									name: 'Install pnpm',
									uses: 'pnpm/action-setup@v2',
									with: {
										version: 8,
									},
								},
								{
									name: 'Install Dependencies',
									run: 'pnpm install --no-frozen-lockfile',
								},
								{
									name: 'Run Tests',
									run: 'pnpm test',
								},
							],
						},
					},
				}),
			})

			fgSyncSpy.mockRestore()
			jest.dontMock('fast-glob')
		})
	})

	describe('createYamlFiles', () => {
		it('should write a yaml file for each exported workflow', () => {
			const workflows: Record<string, Workflow> = {
				myWorkflow1: new Workflow('some-name-1', {
					on: 'push',
					jobs: {
						myJob: {
							'runs-on': 'ubuntu-latest',
							steps: [{ uses: 'actions/checkout@v3' }],
						},
					},
				}),
				myWorkflow2: new Workflow('some-name-2', {
					on: 'pull_request',
					jobs: {
						myJob: {
							'runs-on': 'ubuntu-latest',
							steps: [{ uses: 'actions/checkout@v3' }],
						},
					},
				}),
			}

			const fsWriteFileSyncSpy = jest.spyOn(fs, 'writeFileSync')

			build.writeWorkflowJSONToYamlFiles(workflows, 'some-name-1.wac.ts', {})

			expect(fsWriteFileSyncSpy).toHaveBeenCalledTimes(2)
		})
	})

	describe('writeWorkflowJSONToYamlFiles', () => {
		it('should write the converted YAML with correct DEFAULT_HEADER_TEXT', () => {
			const mockWorkflow = new Workflow('sample-filename', {
				name: 'Sample Workflow',
				on: {
					workflow_dispatch: {},
				},
			})

			const mockYamlString = 'name: Sample Workflow'

			// Mocking function implementations
			jest.spyOn(jsYaml, 'dump').mockReturnValue(mockYamlString)
			jest
				.spyOn(path, 'join')
				.mockReturnValue('.github/workflows/sample-filename.yml')

			build.writeWorkflowJSONToYamlFiles(
				{
					'sample-filename': mockWorkflow,
				},
				'sample-filename.wac.ts',
				{ refs: true },
			)

			expect(fs.writeFileSync).toHaveBeenCalledWith(
				'.github/workflows/sample-filename.yml',
				`${build.DEFAULT_HEADER_TEXT.join('\n').replace(
					'<source-file-path>',
					'sample-filename.wac.ts',
				)}\n${mockYamlString}`,
			)
		})

		it('should handle cases where filename property is not present and default to workflow name', () => {
			const mockWorkflow = new Workflow('sample-filename', {
				name: 'Sample Workflow',
				on: {
					workflow_dispatch: {},
				},
			})

			const mockYamlString = 'name: Sample Workflow'

			jest.spyOn(jsYaml, 'dump').mockReturnValue(mockYamlString)
			jest
				.spyOn(path, 'join')
				.mockReturnValue('.github/workflows/exampleWorkflow.yml')

			build.writeWorkflowJSONToYamlFiles(
				{
					'sample-filename': mockWorkflow,
				},
				'sample-filename.wac.ts',
				{ refs: true },
			)

			expect(fs.writeFileSync).toHaveBeenCalledWith(
				'.github/workflows/exampleWorkflow.yml',
				`${build.DEFAULT_HEADER_TEXT.join('\n').replace(
					'<source-file-path>',
					'sample-filename.wac.ts',
				)}\n${mockYamlString}`,
			)
		})
	})

	describe('generateWorkflowFiles', () => {
		afterEach(() => {
			jest.clearAllMocks()
		})

		it('should generate expected number of files', async () => {
			const mockWorkflowFilePaths = ['./__mocks__/test.wac.ts']
			const mockConfig = { refs: false }

			jest.spyOn(fs, 'writeFileSync').mockImplementation()
			jest.spyOn(jsYaml, 'dump').mockReturnValue('sampleYamlString')
			jest.spyOn(build, 'getConfig').mockReturnValue(mockConfig)
			jest
				.spyOn(build, 'getWorkflowFilePaths')
				.mockReturnValue(mockWorkflowFilePaths)

			await build.generateWorkflowFiles({ refs: true })

			expect(consoleLogSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] Successfully generated 1 workflow file(s)',
			)
		})

		it('should generate no files if no .wac.ts files are found', async () => {
			const mockWorkflowFilePaths: any = undefined
			const mockConfig = { refs: false }

			jest.spyOn(fs, 'writeFileSync').mockImplementation()
			jest.spyOn(jsYaml, 'dump').mockReturnValue('sampleYamlString')
			jest.spyOn(build, 'getConfig').mockReturnValue(mockConfig)
			jest
				.spyOn(build, 'getWorkflowFilePaths')
				.mockReturnValue(mockWorkflowFilePaths)

			await build.generateWorkflowFiles({ refs: true })

			expect(consoleLogSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] Successfully generated 0 workflow file(s)',
			)
		})

		it('should write YAML files to the correct paths', async () => {
			const mockWorkflowFilePaths = ['./__mocks__/test.wac.ts']
			const mockConfig = { refs: false }

			jest.spyOn(fs, 'writeFileSync').mockImplementation()
			jest.spyOn(jsYaml, 'dump').mockReturnValue('sampleYamlString')
			jest.spyOn(build, 'getConfig').mockReturnValue(mockConfig)
			jest
				.spyOn(path, 'join')
				.mockReturnValue('.github/workflows/sample-filename.yml')
			jest
				.spyOn(build, 'getWorkflowFilePaths')
				.mockReturnValue(mockWorkflowFilePaths)

			await build.generateWorkflowFiles({ refs: true })

			expect(fs.writeFileSync).toHaveBeenCalledWith(
				'.github/workflows/sample-filename.yml',
				expect.stringContaining('sampleYamlString'),
			)
		})

		it('should use the config from wac.config.json if available', async () => {
			const mockWorkflowFilePaths = ['./__mocks__/test.wac.ts']
			const mockConfig = { refs: false }

			jest.spyOn(fs, 'writeFileSync').mockImplementation()
			jest.spyOn(jsYaml, 'dump').mockReturnValue('sampleYamlString')
			jest.spyOn(build, 'getConfig').mockReturnValue(mockConfig)
			jest
				.spyOn(build, 'getWorkflowFilePaths')
				.mockReturnValue(mockWorkflowFilePaths)
			jest.spyOn(build, 'writeWorkflowJSONToYamlFiles')

			// Even though we pass in { refs: true }, the config from wac.config.json
			// should override it and set refs to false
			await build.generateWorkflowFiles({ refs: true })

			const expectedConfig: BuildTypes.WacConfig = {
				refs: false,
			}

			expect(build.writeWorkflowJSONToYamlFiles).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything(),
				expectedConfig,
			)
		})

		it('should use default options if no wac.config.json is found', async () => {
			const mockWorkflowFilePaths = ['./__mocks__/test.wac.ts']

			jest.spyOn(fs, 'writeFileSync').mockImplementation()
			jest.spyOn(jsYaml, 'dump').mockReturnValue('sampleYamlString')
			jest.spyOn(build, 'getConfig').mockReturnValue(undefined)
			jest
				.spyOn(build, 'getWorkflowFilePaths')
				.mockReturnValue(mockWorkflowFilePaths)

			await build.generateWorkflowFiles({ refs: true })

			const expectedConfig: BuildTypes.WacConfig = {
				refs: true,
			}

			expect(build.writeWorkflowJSONToYamlFiles).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything(),
				expectedConfig,
			)
		})
	})
})
