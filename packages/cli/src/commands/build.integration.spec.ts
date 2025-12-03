import { describe, it, expect } from '@jest/globals'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { importWorkflowFile } from './build.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
})
