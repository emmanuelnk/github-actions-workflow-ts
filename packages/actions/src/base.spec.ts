import { ActionsSetupNodeV4 } from './generated/actions/setup-node/v4.js'
import { ActionsCheckoutV4 } from './generated/actions/checkout/v4.js'
import {
  NormalJob,
  Context,
  Diagnostics,
} from '@github-actions-workflow-ts/lib'

describe('BaseAction', () => {
  describe('ActionsSetupNodeV4', () => {
    it('should create a step with correct uses value', () => {
      const step = new ActionsSetupNodeV4({
        name: 'Setup Node.js',
      })

      expect(step.step.uses).toBe('actions/setup-node@v4')
      expect(step.step.name).toBe('Setup Node.js')
    })

    it('should accept typed with inputs', () => {
      const step = new ActionsSetupNodeV4({
        name: 'Setup Node.js',
        with: {
          'node-version': '20.x',
          cache: 'pnpm',
        },
      })

      expect(step.step.with).toEqual({
        'node-version': '20.x',
        cache: 'pnpm',
      })
    })

    it('should provide typed outputs when id is set', () => {
      const step = new ActionsSetupNodeV4({
        id: 'setup-node',
        name: 'Setup Node.js',
      })

      expect(step.outputs['node-version']).toBe(
        '${{ steps.setup-node.outputs.node-version }}',
      )
      expect(step.outputs['cache-hit']).toBe(
        '${{ steps.setup-node.outputs.cache-hit }}',
      )
    })

    it('should have empty outputs when id is not set', () => {
      const step = new ActionsSetupNodeV4({
        name: 'Setup Node.js',
      })

      expect(step.outputs['node-version']).toBe('')
      expect(step.outputs['cache-hit']).toBe('')
    })
  })

  describe('ActionsCheckoutV4', () => {
    it('should create a checkout step', () => {
      const step = new ActionsCheckoutV4({
        name: 'Checkout code',
        with: {
          'fetch-depth': 0,
        },
      })

      expect(step.step.uses).toBe('actions/checkout@v4')
      expect(step.step.with).toEqual({
        'fetch-depth': 0,
      })
    })
  })

  describe('Integration with NormalJob', () => {
    it('should work with NormalJob.addStep', () => {
      const checkout = new ActionsCheckoutV4({ name: 'Checkout' })
      const setupNode = new ActionsSetupNodeV4({
        id: 'setup-node',
        name: 'Setup Node.js',
        with: {
          'node-version': '20.x',
        },
      })

      const job = new NormalJob('build', {
        'runs-on': 'ubuntu-latest',
      })
        .addStep(checkout)
        .addStep(setupNode)

      expect(job.job.steps).toHaveLength(2)
      expect(job.job.steps![0].uses).toBe('actions/checkout@v4')
      expect(job.job.steps![1].uses).toBe('actions/setup-node@v4')
    })
  })

  describe('validateUses', () => {
    let emittedDiagnostics: Diagnostics.Diagnostic[]
    const mockReporter: Diagnostics.DiagnosticsReporter = {
      emit: (d) => emittedDiagnostics.push(d),
    }

    beforeEach(() => {
      emittedDiagnostics = []
      Context.__internalSetGlobalContext({ diagnostics: mockReporter })
    })

    afterEach(() => {
      // Clear the global context
      Context.__internalSetGlobalContext(undefined as never)
    })

    it('should emit warning when action repository does not match expected', () => {
      // Using a custom 'uses' that doesn't match 'actions/setup-node'
      new ActionsSetupNodeV4({
        name: 'Setup Node.js',
        uses: 'some-other/action@v4',
      })

      expect(emittedDiagnostics).toHaveLength(1)
      expect(emittedDiagnostics[0].code).toBe('action-version-unverifiable')
      expect(emittedDiagnostics[0].severity).toBe(
        Diagnostics.DiagnosticSeverity.WARN,
      )
      expect(emittedDiagnostics[0].message).toContain(
        "Cannot verify the version of action 'some-other/action@v4'",
      )
    })

    it('should emit warning when git ref is not a valid semver', () => {
      new ActionsSetupNodeV4({
        name: 'Setup Node.js',
        uses: 'actions/setup-node@main',
      })

      expect(emittedDiagnostics).toHaveLength(1)
      expect(emittedDiagnostics[0].code).toBe('action-version-unverifiable')
      expect(emittedDiagnostics[0].message).toContain(
        'git ref is not a valid semver version',
      )
    })

    it('should emit warning when version violates semver constraint', () => {
      // v3 is not compatible with v4.4.0 (different major version)
      new ActionsSetupNodeV4({
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v3',
      })

      expect(emittedDiagnostics).toHaveLength(1)
      expect(emittedDiagnostics[0].code).toBe('action-version-semver-violation')
      expect(emittedDiagnostics[0].severity).toBe(
        Diagnostics.DiagnosticSeverity.WARN,
      )
    })

    it('should not emit warning for compatible major version', () => {
      new ActionsSetupNodeV4({
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v4',
      })

      expect(emittedDiagnostics).toHaveLength(0)
    })

    it('should not emit warning for compatible full semver', () => {
      new ActionsSetupNodeV4({
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v4.5.0',
      })

      expect(emittedDiagnostics).toHaveLength(0)
    })

    it('should emit warning when patch version is lower than required', () => {
      // v4.3.0 is less than the resolved v4.4.0
      new ActionsSetupNodeV4({
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v4.3.0',
      })

      expect(emittedDiagnostics).toHaveLength(1)
      expect(emittedDiagnostics[0].code).toBe('action-version-semver-violation')
    })

    it('should not validate when default uses is used (no custom override)', () => {
      // When no 'uses' is provided, validateUses is not called
      new ActionsSetupNodeV4({
        name: 'Setup Node.js',
      })

      expect(emittedDiagnostics).toHaveLength(0)
    })

    it('should include stack trace in emitted diagnostic', () => {
      new ActionsSetupNodeV4({
        name: 'Setup Node.js',
        uses: 'actions/setup-node@main',
      })

      expect(emittedDiagnostics).toHaveLength(1)
      expect(emittedDiagnostics[0].stack).toBeDefined()
      expect(typeof emittedDiagnostics[0].stack).toBe('string')
    })
  })
})
