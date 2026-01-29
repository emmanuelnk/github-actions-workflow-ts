import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals'
import { Workflow } from '@github-actions-workflow-ts/lib'

// Mock modules before importing the module under test
const mockFs = {
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
}

const mockPath = {
  relative: jest.fn(),
  // Default implementation for join - used at module load time for DEFAULT_OUTPUT_PATH
  join: jest.fn((...parts: string[]) => parts.join('/')),
  resolve: jest.fn(),
  basename: jest.fn((p: string) => p.split('/').pop() || ''),
}

const mockJsYaml = {
  dump: jest.fn(),
}

const mockFg = {
  sync: jest.fn(),
  convertPathToPattern: jest.fn((p: string) => p),
}

const mockMicromatch = {
  isMatch: jest.fn(),
}

jest.unstable_mockModule('fs', () => mockFs)
jest.unstable_mockModule('path', () => mockPath)
jest.unstable_mockModule('js-yaml', () => mockJsYaml)
jest.unstable_mockModule('fast-glob', () => ({
  default: mockFg,
}))
jest.unstable_mockModule('micromatch', () => ({
  default: mockMicromatch,
}))

// Import the module under test after mocking
const build = await import('./build.js')

describe('build', () => {
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.clearAllMocks()
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  describe('DEFAULT_HEADER_TEXT', () => {
    it('should be defined', () => {
      expect(build.DEFAULT_HEADER_TEXT).toBeDefined()
      expect(Array.isArray(build.DEFAULT_HEADER_TEXT)).toBe(true)
    })
  })

  describe('DEFAULT_OUTPUT_PATH', () => {
    it('should be defined', () => {
      expect(build.DEFAULT_OUTPUT_PATH).toBeDefined()
      expect(typeof build.DEFAULT_OUTPUT_PATH).toBe('string')
    })
  })

  describe('resolveOutputPath', () => {
    beforeEach(() => {
      mockPath.basename.mockImplementation((p: string) => p.split('/').pop())
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))
    })

    it('should return workflow.outputPath if set (highest priority)', () => {
      const workflow = new Workflow(
        'test',
        { on: 'push' },
        { outputPath: 'custom/path' },
      )
      const config = {
        outputPaths: {
          workflows: {
            default: 'config/default/path',
            overrides: [{ match: 'test.wac.ts', path: 'override/path' }],
          },
        },
      }

      const result = build.resolveOutputPath(workflow, 'test.wac.ts', config)

      expect(result).toBe('custom/path')
    })

    it('should return matching override path if no workflow.outputPath (filename match)', () => {
      const workflow = new Workflow('test', { on: 'push' })
      const config = {
        outputPaths: {
          workflows: {
            default: 'config/default/path',
            overrides: [
              { match: 'other.wac.ts', path: 'other/path' },
              { match: 'test.wac.ts', path: 'override/path' },
            ],
          },
        },
      }

      mockMicromatch.isMatch
        .mockReturnValueOnce(false) // full path doesn't match 'other.wac.ts'
        .mockReturnValueOnce(false) // filename doesn't match 'other.wac.ts'
        .mockReturnValueOnce(false) // full path doesn't match 'test.wac.ts'
        .mockReturnValueOnce(true) // filename matches 'test.wac.ts'

      const result = build.resolveOutputPath(
        workflow,
        'src/test.wac.ts',
        config,
      )

      expect(result).toBe('override/path')
    })

    it('should support full path matching in overrides', () => {
      const workflow = new Workflow('deploy', { on: 'push' })
      const config = {
        outputPaths: {
          workflows: {
            overrides: [
              {
                match: 'packages/app-a/**/*.wac.ts',
                path: 'packages/app-a/.github/workflows',
              },
            ],
          },
        },
      }

      mockMicromatch.isMatch.mockReturnValueOnce(true) // full path matches

      const result = build.resolveOutputPath(
        workflow,
        'packages/app-a/workflows/deploy.wac.ts',
        config,
      )

      expect(result).toBe('packages/app-a/.github/workflows')
      expect(mockMicromatch.isMatch).toHaveBeenCalledWith(
        'packages/app-a/workflows/deploy.wac.ts',
        'packages/app-a/**/*.wac.ts',
      )
    })

    it('should support glob patterns in overrides (filename)', () => {
      const workflow = new Workflow('deploy', { on: 'push' })
      const config = {
        outputPaths: {
          workflows: {
            overrides: [
              { match: '*-release.wac.ts', path: 'releases/workflows' },
            ],
          },
        },
      }

      mockMicromatch.isMatch
        .mockReturnValueOnce(false) // full path doesn't match
        .mockReturnValueOnce(true) // filename matches

      const result = build.resolveOutputPath(
        workflow,
        'app-release.wac.ts',
        config,
      )

      expect(result).toBe('releases/workflows')
    })

    it('should return config default if no override matches', () => {
      const workflow = new Workflow('test', { on: 'push' })
      const config = {
        outputPaths: {
          workflows: {
            default: 'custom/default/path',
            overrides: [{ match: 'other.wac.ts', path: 'other/path' }],
          },
        },
      }

      mockMicromatch.isMatch
        .mockReturnValueOnce(false) // full path doesn't match
        .mockReturnValueOnce(false) // filename doesn't match

      const result = build.resolveOutputPath(workflow, 'test.wac.ts', config)

      expect(result).toBe('custom/default/path')
    })

    it('should return DEFAULT_OUTPUT_PATH if no config outputPaths', () => {
      const workflow = new Workflow('test', { on: 'push' })
      const config = {}

      const result = build.resolveOutputPath(workflow, 'test.wac.ts', config)

      expect(result).toBe(build.DEFAULT_OUTPUT_PATH)
    })

    it('should return DEFAULT_OUTPUT_PATH if outputPaths.workflows is undefined', () => {
      const workflow = new Workflow('test', { on: 'push' })
      const config = { outputPaths: {} }

      const result = build.resolveOutputPath(workflow, 'test.wac.ts', config)

      expect(result).toBe(build.DEFAULT_OUTPUT_PATH)
    })

    it('should return DEFAULT_OUTPUT_PATH if no overrides and no default', () => {
      const workflow = new Workflow('test', { on: 'push' })
      const config = { outputPaths: { workflows: {} } }

      const result = build.resolveOutputPath(workflow, 'test.wac.ts', config)

      expect(result).toBe(build.DEFAULT_OUTPUT_PATH)
    })

    it('should check overrides in order and return first match', () => {
      const workflow = new Workflow('test', { on: 'push' })
      const config = {
        outputPaths: {
          workflows: {
            overrides: [
              { match: '*.wac.ts', path: 'first/match' },
              { match: 'test.wac.ts', path: 'second/match' },
            ],
          },
        },
      }

      mockMicromatch.isMatch.mockReturnValueOnce(true) // first pattern matches

      const result = build.resolveOutputPath(workflow, 'test.wac.ts', config)

      expect(result).toBe('first/match')
      expect(mockMicromatch.isMatch).toHaveBeenCalledTimes(1)
    })
  })

  describe('relativePath', () => {
    it('calls path.relative with correct arguments', () => {
      const mockCwd = '/mock/absolute/path'
      const mockAbsolutePath = '/mock/absolute/path/to/file.txt'
      const mockRelativePath = 'to/file.txt'
      mockPath.relative.mockReturnValue(mockRelativePath)
      jest.spyOn(process, 'cwd').mockReturnValue(mockCwd)

      const result = build.relativePath(mockAbsolutePath)

      expect(mockPath.relative).toHaveBeenCalledWith(mockCwd, mockAbsolutePath)
      expect(result).toBe(mockRelativePath)
    })
  })

  describe('getConfig', () => {
    it('should return undefined if wac.config.json does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)
      mockPath.join.mockReturnValue('some/fake/path/wac.config.json')

      const result = build.getConfig()

      expect(result).toBeUndefined()
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] No config (wac.config.json) file found in root dir. Using default config.',
      )
    })

    it('should return the config object if wac.config.json exists', () => {
      const mockConfig = JSON.stringify({ key: 'value' })
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue(mockConfig)
      mockPath.join.mockReturnValue('some/fake/path/wac.config.json')

      const result = build.getConfig()

      expect(result).toEqual({ key: 'value' })
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] wac.config.json config file found in root dir',
      )
    })

    it('should throw an error if the config file contains invalid JSON', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readFileSync.mockReturnValue('invalid JSON')
      mockPath.join.mockReturnValue('some/fake/path/wac.config.json')

      expect(() => build.getConfig()).toThrow()
    })
  })

  describe('getConfigAsync', () => {
    it('should return undefined if no config file exists', async () => {
      mockFs.existsSync.mockReturnValue(false)
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))

      const result = await build.getConfigAsync()

      expect(result).toBeUndefined()
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] No config file found in root dir. Using default config.',
      )
    })

    it('should return config from wac.config.json if it exists and no TS config', async () => {
      const mockConfig = JSON.stringify({ refs: false })
      mockFs.existsSync
        .mockReturnValueOnce(false) // wac.config.ts doesn't exist
        .mockReturnValueOnce(true) // wac.config.json exists
      mockFs.readFileSync.mockReturnValue(mockConfig)
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))

      const result = await build.getConfigAsync()

      expect(result).toEqual({ refs: false })
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] wac.config.json config file found in root dir',
      )
    })

    it('should throw an error if JSON config contains invalid JSON', async () => {
      mockFs.existsSync
        .mockReturnValueOnce(false) // wac.config.ts doesn't exist
        .mockReturnValueOnce(true) // wac.config.json exists
      mockFs.readFileSync.mockReturnValue('invalid JSON')
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))

      await expect(build.getConfigAsync()).rejects.toThrow()
    })
  })

  describe('CONFIG_FILE_NAMES', () => {
    it('should list TypeScript config before JSON config', () => {
      expect(build.CONFIG_FILE_NAMES[0]).toBe('wac.config.ts')
      expect(build.CONFIG_FILE_NAMES[1]).toBe('wac.config.json')
    })
  })

  describe('getWorkflowFilePaths', () => {
    it('should return undefined and log message if no workflow files are found', () => {
      mockFg.sync.mockReturnValue([])

      const result = build.getWorkflowFilePaths()

      expect(result).toBeUndefined()
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] No workflow files found. Please create at least one *.wac.ts file in your project',
      )
    })

    it('should return workflow files paths and log message', () => {
      mockFg.sync.mockReturnValue(['.github/workflows/test.wac.ts'])
      mockPath.relative.mockReturnValue('.github/workflows/test.wac.ts')

      const result = build.getWorkflowFilePaths()

      expect(result).toEqual(['.github/workflows/test.wac.ts'])
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] Detected following .wac.ts files:\n[github-actions-workflow-ts] --> .github/workflows/test.wac.ts',
      )
    })
  })

  describe('createWorkflowDirectory', () => {
    it('should create directory if it does not exist (default path)', () => {
      mockFs.existsSync.mockReturnValue(false)
      mockPath.join.mockReturnValue('.github/workflows')
      mockPath.relative.mockReturnValue('.github/workflows')

      build.createWorkflowDirectory()

      expect(mockFs.mkdirSync).toHaveBeenCalledWith(expect.any(String), {
        recursive: true,
      })
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] .github/workflows directory not found. Creating it.',
      )
    })

    it('should create directory with custom path if provided', () => {
      mockFs.existsSync.mockReturnValue(false)
      mockPath.relative.mockReturnValue('custom/output/path')

      build.createWorkflowDirectory('custom/output/path')

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('custom/output/path', {
        recursive: true,
      })
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] custom/output/path directory not found. Creating it.',
      )
    })

    it('should not create directory if it already exists', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockPath.join.mockReturnValue('.github/workflows')
      mockPath.relative.mockReturnValue('.github/workflows')

      build.createWorkflowDirectory()

      expect(mockFs.mkdirSync).not.toHaveBeenCalled()
    })
  })

  describe('importWorkflowFile', () => {
    it('should be a function', () => {
      expect(build.importWorkflowFile).toBeDefined()
      expect(typeof build.importWorkflowFile).toBe('function')
    })

    it('should resolve path and create file URL', async () => {
      // The function calls path.resolve which we've mocked
      mockPath.resolve.mockReturnValue('/absolute/path/test.wac.ts')

      // We can't fully test dynamic import, but we can verify the setup
      // The actual import will fail, but we test that the function exists
      try {
        await build.importWorkflowFile('test.wac.ts')
      } catch {
        // Expected to fail as the mock file doesn't exist
      }

      expect(mockPath.resolve).toHaveBeenCalledWith('test.wac.ts')
    })
  })

  describe('writeWorkflowJSONToYamlFiles', () => {
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

      mockJsYaml.dump.mockReturnValue('yaml content')
      mockPath.join.mockReturnValue('.github/workflows/test.yml')
      mockPath.relative.mockReturnValue('.github/workflows/test.yml')
      mockFs.writeFileSync.mockClear()

      const count = build.writeWorkflowJSONToYamlFiles(
        workflows,
        'some-name-1.wac.ts',
        {},
      )

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(2)
      expect(count).toBe(2)
    })

    it('should skip non-Workflow exports', () => {
      const workflows: Record<string, unknown> = {
        myWorkflow1: new Workflow('some-name-1', {
          on: 'push',
          jobs: {
            myJob: {
              'runs-on': 'ubuntu-latest',
              steps: [{ uses: 'actions/checkout@v3' }],
            },
          },
        }),
        notAWorkflow: { something: 'else' },
        alsoNotAWorkflow: null,
      }

      mockJsYaml.dump.mockReturnValue('yaml content')
      mockPath.join.mockReturnValue('.github/workflows/test.yml')
      mockPath.relative.mockReturnValue('.github/workflows/test.yml')
      mockFs.writeFileSync.mockClear()

      const count = build.writeWorkflowJSONToYamlFiles(
        workflows as Record<string, Workflow>,
        'some-name-1.wac.ts',
        {},
      )

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1)
      expect(count).toBe(1)
    })

    it('should write the converted YAML with correct DEFAULT_HEADER_TEXT', () => {
      const mockWorkflow = new Workflow('sample-filename', {
        name: 'Sample Workflow',
        on: {
          workflow_dispatch: {},
        },
      })

      const mockYamlString = 'name: Sample Workflow'

      mockJsYaml.dump.mockReturnValue(mockYamlString)
      mockPath.join.mockReturnValue('.github/workflows/sample-filename.yml')
      mockPath.relative.mockReturnValue('.github/workflows/sample-filename.yml')
      mockFs.writeFileSync.mockClear()

      build.writeWorkflowJSONToYamlFiles(
        { 'sample-filename': mockWorkflow },
        'sample-filename.wac.ts',
        { refs: true },
      )

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        '.github/workflows/sample-filename.yml',
        expect.stringContaining(mockYamlString),
      )
    })

    it('should use custom headerText if provided', () => {
      const mockWorkflow = new Workflow('sample-filename', {
        name: 'Sample Workflow',
        on: {
          workflow_dispatch: {},
        },
      })

      mockJsYaml.dump.mockReturnValue('yaml content')
      mockPath.join.mockReturnValue('.github/workflows/test.yml')
      mockPath.relative.mockReturnValue('.github/workflows/test.yml')
      mockFs.writeFileSync.mockClear()

      const customHeader = ['# Custom Header']

      build.writeWorkflowJSONToYamlFiles(
        { workflow: mockWorkflow },
        'test.wac.ts',
        { headerText: customHeader },
      )

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('# Custom Header'),
      )
    })

    it('should use workflow.outputPath when set', () => {
      const mockWorkflow = new Workflow(
        'sample-filename',
        { name: 'Sample Workflow', on: 'push' },
        { outputPath: 'packages/app-a/.github/workflows' },
      )

      mockJsYaml.dump.mockReturnValue('yaml content')
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))
      mockPath.relative.mockImplementation((p: string) => p)
      mockPath.basename.mockReturnValue('test.wac.ts')
      mockFs.existsSync.mockReturnValue(true) // directory exists
      mockFs.writeFileSync.mockClear()

      const createdDirectories = new Set<string>()

      build.writeWorkflowJSONToYamlFiles(
        { workflow: mockWorkflow },
        'test.wac.ts',
        {},
        createdDirectories,
      )

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'packages/app-a/.github/workflows/sample-filename.yml',
        expect.any(String),
      )
    })

    it('should create directory and track it in createdDirectories set', () => {
      const mockWorkflow = new Workflow(
        'sample-filename',
        { name: 'Sample Workflow', on: 'push' },
        { outputPath: 'custom/output/path' },
      )

      mockJsYaml.dump.mockReturnValue('yaml content')
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))
      // path.relative takes (from, to) and returns the relative path
      mockPath.relative.mockImplementation((_from: string, to: string) => to)
      mockPath.basename.mockReturnValue('test.wac.ts')
      mockFs.existsSync.mockReturnValue(false) // directory doesn't exist
      mockFs.writeFileSync.mockClear()
      mockFs.mkdirSync.mockClear()

      const createdDirectories = new Set<string>()

      build.writeWorkflowJSONToYamlFiles(
        { workflow: mockWorkflow },
        'test.wac.ts',
        {},
        createdDirectories,
      )

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('custom/output/path', {
        recursive: true,
      })
      expect(createdDirectories.has('custom/output/path')).toBe(true)
    })

    it('should not recreate directory if already in createdDirectories set', () => {
      const mockWorkflow = new Workflow(
        'sample-filename',
        { name: 'Sample Workflow', on: 'push' },
        { outputPath: 'custom/output/path' },
      )

      mockJsYaml.dump.mockReturnValue('yaml content')
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))
      mockPath.relative.mockImplementation((p: string) => p)
      mockPath.basename.mockReturnValue('test.wac.ts')
      mockFs.writeFileSync.mockClear()
      mockFs.mkdirSync.mockClear()

      const createdDirectories = new Set<string>(['custom/output/path'])

      build.writeWorkflowJSONToYamlFiles(
        { workflow: mockWorkflow },
        'test.wac.ts',
        {},
        createdDirectories,
      )

      expect(mockFs.mkdirSync).not.toHaveBeenCalled()
    })

    it('should use config outputPaths.workflows.default', () => {
      const mockWorkflow = new Workflow('sample-filename', {
        name: 'Sample Workflow',
        on: 'push',
      })

      mockJsYaml.dump.mockReturnValue('yaml content')
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))
      mockPath.relative.mockImplementation((p: string) => p)
      mockPath.basename.mockReturnValue('test.wac.ts')
      mockFs.existsSync.mockReturnValue(true)
      mockFs.writeFileSync.mockClear()

      const config = {
        outputPaths: {
          workflows: {
            default: 'custom/default/workflows',
          },
        },
      }

      build.writeWorkflowJSONToYamlFiles(
        { workflow: mockWorkflow },
        'test.wac.ts',
        config,
      )

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'custom/default/workflows/sample-filename.yml',
        expect.any(String),
      )
    })

    it('should use config outputPaths.workflows.overrides when match found', () => {
      const mockWorkflow = new Workflow('deploy', {
        name: 'Deploy Workflow',
        on: 'push',
      })

      mockJsYaml.dump.mockReturnValue('yaml content')
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))
      mockPath.relative.mockImplementation((p: string) => p)
      mockPath.basename.mockReturnValue('app-deploy.wac.ts')
      mockFs.existsSync.mockReturnValue(true)
      mockFs.writeFileSync.mockClear()
      mockMicromatch.isMatch.mockReturnValueOnce(true)

      const config = {
        outputPaths: {
          workflows: {
            default: '.github/workflows',
            overrides: [
              {
                match: '*-deploy.wac.ts',
                path: 'packages/app/.github/workflows',
              },
            ],
          },
        },
      }

      build.writeWorkflowJSONToYamlFiles(
        { workflow: mockWorkflow },
        'app-deploy.wac.ts',
        config,
      )

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'packages/app/.github/workflows/deploy.yml',
        expect.any(String),
      )
    })
  })

  describe('generateWorkflowFiles', () => {
    it('should generate no files if no .wac.ts files are found', async () => {
      // Mock existsSync to return false for config files
      mockFs.existsSync.mockReturnValue(false)
      mockFg.sync.mockReturnValue([])
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))
      mockPath.relative.mockReturnValue('.github/workflows')

      await build.generateWorkflowFiles({ refs: true })

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] Successfully generated 0 workflow file(s)',
      )
    })

    it('should use config from wac.config.json if found', async () => {
      // getConfigAsync checks: wac.config.ts (false), wac.config.json (true)
      mockFs.existsSync
        .mockReturnValueOnce(false) // wac.config.ts doesn't exist
        .mockReturnValueOnce(true) // wac.config.json exists
        .mockReturnValue(true) // other checks (workflows dir, etc.)
      mockFs.readFileSync.mockReturnValue(JSON.stringify({ refs: false }))
      mockFg.sync.mockReturnValue([])
      mockPath.join.mockImplementation((...parts: string[]) => parts.join('/'))
      mockPath.relative.mockReturnValue('.github/workflows')

      await build.generateWorkflowFiles({ refs: true })

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] wac.config.json config file found in root dir',
      )
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] Successfully generated 0 workflow file(s)',
      )
    })
  })
})
