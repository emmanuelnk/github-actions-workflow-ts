import * as tsNode from 'ts-node'
import * as build from './build'
import * as fs from 'fs'
import * as path from 'path'
import * as jsYaml from 'js-yaml'
import { Workflow } from '..'

jest.mock('fs')
jest.mock('path')
jest.mock('js-yaml')
jest.mock('ts-node')

describe('build', () => {
	let logSpy: jest.SpyInstance
	let consoleSpy: jest.SpyInstance

	beforeEach(() => {
		logSpy = jest.spyOn(console, 'log').mockImplementation()
		consoleSpy = jest.spyOn(console, 'error').mockImplementation()
	})

	afterEach(() => {
		logSpy.mockRestore()
		consoleSpy.mockRestore()
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
		let logSpy: jest.SpyInstance

		beforeEach(() => {
			logSpy = jest.spyOn(console, 'log').mockImplementation()
		})

		afterEach(() => {
			logSpy.mockRestore()
		})

		it('should return undefined and log message if no workflow files are found', () => {
			const fg = require('fast-glob')
			jest.doMock('fast-glob')
			const fgSyncSpy = jest.spyOn(fg, 'sync').mockReturnValue([])
			const result = build.getWorkflowFilePaths()
			expect(result).toBeUndefined()
			expect(logSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] No workflow files found. Please create at least one *.wac.ts file in your project',
			)
			fgSyncSpy.mockRestore()
			jest.dontMock('fast-glob')
		})

		it('should return workflow files paths and log message', () => {
			const fg = require('fast-glob')
			jest.doMock('fast-glob')

			const fgSyncSpy = jest
				.spyOn(fg, 'sync')
				.mockReturnValue(['.github/workflows/test.wac.ts'])
			const cwdSpy = jest
				.spyOn(build, 'relativePath')
				.mockReturnValue('.github/workflows/test.wac.ts')
			const result = build.getWorkflowFilePaths()
			expect(result).toEqual(['.github/workflows/test.wac.ts'])
			expect(logSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] Detected following .wac.ts files:\n',
				'-> .github/workflows/test.wac.ts',
			)
			cwdSpy.mockRestore()
			fgSyncSpy.mockRestore()
			jest.dontMock('fast-glob')
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
				test: new Workflow('test', {
					name: 'Test',
					on: {
						push: {
							branches: ['**', '!main'],
						},
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
									run: 'pnpm install',
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

			build.writeWorkflowJSONToYamlFiles(workflows, {})

			expect(fsWriteFileSyncSpy).toHaveBeenCalledTimes(2)
		})
	})

	describe('writeWorkflowJSONToYamlFiles', () => {
		it('should write the converted YAML with correct DO_NOT_MODIFY_COMMENT', () => {
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
				{ refs: true },
			)

			expect(fs.writeFileSync).toHaveBeenCalledWith(
				'.github/workflows/sample-filename.yml',
				`${build.DO_NOT_MODIFY_COMMENT}\n${mockYamlString}`,
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
				{ refs: true },
			)

			expect(fs.writeFileSync).toHaveBeenCalledWith(
				'.github/workflows/exampleWorkflow.yml',
				`${build.DO_NOT_MODIFY_COMMENT}\n${mockYamlString}`,
			)
		})
	})

	describe('generateWorkflowFiles', () => {
		it('should generate expected number of files', async () => {
			const mockWorkflowFilePaths = ['./__mocks__/test.wac.ts']

			jest.spyOn(fs, 'writeFileSync').mockImplementation()
			jest.spyOn(jsYaml, 'dump').mockReturnValue('sampleYamlString')
			jest
				.spyOn(build, 'getWorkflowFilePaths')
				.mockReturnValue(mockWorkflowFilePaths)

			await build.generateWorkflowFiles({ refs: true })

			expect(logSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] Successfully generated 1 workflow file(s)',
			)
		})

		it('should generate no files if no .wac.ts files are found', async () => {
			const mockWorkflowFilePaths: any = undefined

			jest.spyOn(fs, 'writeFileSync').mockImplementation()
			jest.spyOn(jsYaml, 'dump').mockReturnValue('sampleYamlString')
			jest
				.spyOn(build, 'getWorkflowFilePaths')
				.mockReturnValue(mockWorkflowFilePaths)

			await build.generateWorkflowFiles({ refs: true })

			expect(logSpy).toHaveBeenCalledWith(
				'[github-actions-workflow-ts] Successfully generated 0 workflow file(s)',
			)
		})

		it('should write YAML files to the correct paths', async () => {
			const mockWorkflowFilePaths = ['./__mocks__/test.wac.ts']

			jest.spyOn(fs, 'writeFileSync').mockImplementation()
			jest.spyOn(jsYaml, 'dump').mockReturnValue('sampleYamlString')
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
	})
})
