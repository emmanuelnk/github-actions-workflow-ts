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
  join: jest.fn(),
  resolve: jest.fn(),
}

const mockJsYaml = {
  dump: jest.fn(),
}

const mockFg = {
  sync: jest.fn(),
  convertPathToPattern: jest.fn((p: string) => p),
}

jest.unstable_mockModule('fs', () => mockFs)
jest.unstable_mockModule('path', () => mockPath)
jest.unstable_mockModule('js-yaml', () => mockJsYaml)
jest.unstable_mockModule('fast-glob', () => ({
  default: mockFg,
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
    it('should create .github/workflows directory if it does not exist', () => {
      mockFs.existsSync.mockReturnValue(false)
      mockPath.join.mockReturnValue('some/fake/path')
      mockPath.relative.mockReturnValue('some/fake/path')

      build.createWorkflowDirectory()

      expect(mockFs.mkdirSync).toHaveBeenCalledWith(expect.any(String), {
        recursive: true,
      })
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] .github/workflows directory not found. Creating it.',
      )
    })

    it('should not create .github/workflows directory if it already exists', () => {
      mockFs.existsSync.mockReturnValue(true)
      mockPath.join.mockReturnValue('some/fake/path')
      mockPath.relative.mockReturnValue('some/fake/path')

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
  })

  describe('generateWorkflowFiles', () => {
    it('should generate no files if no .wac.ts files are found', async () => {
      // Mock existsSync to return false for config, true for workflows dir
      mockFs.existsSync.mockReturnValue(false)
      mockFg.sync.mockReturnValue([])
      mockPath.join.mockReturnValue('.github/workflows')
      mockPath.relative.mockReturnValue('.github/workflows')

      await build.generateWorkflowFiles({ refs: true })

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] Successfully generated 0 workflow file(s)',
      )
    })

    it('should use config from wac.config.json if found', async () => {
      // First call to existsSync is for config file, return true
      // Second call is for workflows directory
      mockFs.existsSync
        .mockReturnValueOnce(true) // config exists
        .mockReturnValue(true) // workflows dir exists
      mockFs.readFileSync.mockReturnValue(JSON.stringify({ refs: false }))
      mockFg.sync.mockReturnValue([])
      mockPath.join.mockReturnValue('.github/workflows')
      mockPath.relative.mockReturnValue('.github/workflows')

      await build.generateWorkflowFiles({ refs: true })

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[github-actions-workflow-ts] Successfully generated 0 workflow file(s)',
      )
    })
  })
})
