import { ActionsSetupNodeV4 } from './generated/actions/setup-node/v4.js'
import { ActionsCheckoutV4 } from './generated/actions/checkout/v4.js'
import { NormalJob } from '@github-actions-workflow-ts/lib'

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
})
