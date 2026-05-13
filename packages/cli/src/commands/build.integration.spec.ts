import {
  describe,
  it,
  expect,
  afterEach,
  beforeEach,
  jest,
} from '@jest/globals'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { Context } from '@github-actions-workflow-ts/lib'
import { generateWorkflowFiles, importWorkflowFile } from './build.js'
import { ConsoleDiagnosticsReporter } from './diagnostics.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CLI_PACKAGE_ROOT = path.resolve(__dirname, '..', '..')

describe('build integration tests', () => {
  describe('importWorkflowFile', () => {
    it('should successfully import a .wac.ts file and return workflow exports', async () => {
      // Use the actual mock workflow file
      const mockWacPath = path.join(__dirname, '__mocks__', 'test.wac.ts')

      // This tests the actual dynamic import functionality
      const result = await importWorkflowFile(mockWacPath)

      // Verify we got the exported workflow
      expect(result).toBeDefined()
      expect(result.test).toBeDefined()
      expect(result.test.workflow).toBeDefined()
      expect(result.test.filename).toBe('mock-test')
      expect(result.test.workflow.name).toBe('ExampleMockTests')
    })
  })

  describe('error-severity diagnostics flip hasErrors on the reporter', () => {
    let consoleErrorSpy: jest.SpiedFunction<typeof console.error>

    beforeEach(() => {
      consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
    })

    afterEach(() => {
      consoleErrorSpy.mockRestore()
      Context.__internalSetGlobalContext(undefined as never)
    })

    it('should set reporter.hasErrors when a wac file emits an error diagnostic', async () => {
      const reporter = new ConsoleDiagnosticsReporter({ color: false })
      Context.__internalSetGlobalContext({ diagnostics: reporter })

      const mockWacPath = path.join(
        __dirname,
        '__mocks__',
        'error-emitting.fixture.ts',
      )
      await importWorkflowFile(mockWacPath)

      expect(reporter.hasErrors).toBe(true)
    })

    it('should not set reporter.hasErrors when a wac file only emits a warning', async () => {
      const reporter = new ConsoleDiagnosticsReporter({ color: false })
      Context.__internalSetGlobalContext({ diagnostics: reporter })

      const mockWacPath = path.join(
        __dirname,
        '__mocks__',
        'warning-emitting.fixture.ts',
      )
      await importWorkflowFile(mockWacPath)

      expect(reporter.hasErrors).toBe(false)
    })
  })

  describe('generateWorkflowFiles exit-code behaviour', () => {
    let consoleSpies: {
      log: jest.SpiedFunction<typeof console.log>
      error: jest.SpiedFunction<typeof console.error>
    }
    let originalCwd: string
    let originalExitCode: typeof process.exitCode
    let tmpDir: string

    /**
     * Build a temp project containing a single `*.wac.ts` file and (optionally)
     * a `wac.config.json`. The wac file imports the library through a relative
     * symlink so the dynamic import inside `importWorkflowFile` resolves it.
     */
    const setupProject = (opts: {
      wacFilename: string
      configJson?: Record<string, unknown>
    }) => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wac-it-'))

      // Symlink the CLI package's node_modules into the temp project so the
      // wac file can resolve '@github-actions-workflow-ts/lib' via dynamic
      // import. (The workspace's `lib` lives under packages/cli/node_modules
      // when pnpm sets up workspace links, not the repo-root node_modules.)
      const cliNodeModules = path.join(CLI_PACKAGE_ROOT, 'node_modules')
      fs.symlinkSync(cliNodeModules, path.join(tmpDir, 'node_modules'), 'dir')

      const wacSrc = fs.readFileSync(
        path.join(__dirname, '__mocks__', opts.wacFilename),
        'utf-8',
      )
      fs.writeFileSync(path.join(tmpDir, 'wf.wac.ts'), wacSrc)

      if (opts.configJson) {
        fs.writeFileSync(
          path.join(tmpDir, 'wac.config.json'),
          JSON.stringify(opts.configJson),
        )
      }

      // Output directory the build will write into.
      fs.mkdirSync(path.join(tmpDir, '.github', 'workflows'), {
        recursive: true,
      })
    }

    beforeEach(() => {
      consoleSpies = {
        log: jest.spyOn(console, 'log').mockImplementation(() => {}),
        error: jest.spyOn(console, 'error').mockImplementation(() => {}),
      }
      originalCwd = process.cwd()
      originalExitCode = process.exitCode
      process.exitCode = undefined
    })

    afterEach(() => {
      process.chdir(originalCwd)
      process.exitCode = originalExitCode
      consoleSpies.log.mockRestore()
      consoleSpies.error.mockRestore()
      Context.__internalSetGlobalContext(undefined as never)
      if (tmpDir) {
        fs.rmSync(tmpDir, { recursive: true, force: true })
      }
    })

    it('should set process.exitCode to 1 when a wac file emits an error diagnostic', async () => {
      setupProject({ wacFilename: 'error-emitting.fixture.ts' })
      process.chdir(tmpDir)

      await generateWorkflowFiles({})

      expect(process.exitCode).toBe(1)
      expect(consoleSpies.error).toHaveBeenCalledWith(
        expect.stringContaining(
          'Build completed with error diagnostics. Exiting with non-zero status code.',
        ),
      )
    })

    it('should not set process.exitCode when only warnings are emitted', async () => {
      setupProject({ wacFilename: 'warning-emitting.fixture.ts' })
      process.chdir(tmpDir)

      await generateWorkflowFiles({})

      expect(process.exitCode).toBeUndefined()
    })

    it('should not set process.exitCode when failOnError is disabled in wac.config.json', async () => {
      setupProject({
        wacFilename: 'error-emitting.fixture.ts',
        configJson: { diagnostics: { failOnError: false } },
      })
      process.chdir(tmpDir)

      await generateWorkflowFiles({})

      expect(process.exitCode).toBeUndefined()
    })
  })
})
