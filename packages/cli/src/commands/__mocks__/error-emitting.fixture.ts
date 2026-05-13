import {
  Workflow,
  NormalJob,
  Step,
  Context,
  Diagnostics,
} from '@github-actions-workflow-ts/lib'

// Emit an error-severity diagnostic at import time to simulate a wac file
// that detects a problem during workflow construction.
const reporter = Context.getGlobalWacContext()?.diagnostics
reporter?.emit({
  severity: Diagnostics.DiagnosticSeverity.ERROR,
  code: 'simulated-error',
  message: 'simulated error from a wac file',
})

const job = new NormalJob('Test', { 'runs-on': 'ubuntu-latest' }).addSteps([
  new Step({ name: 'Noop', run: 'true' }),
])

export const test = new Workflow('error-emitting-mock', {
  name: 'ErrorEmittingMock',
  on: { workflow_dispatch: {} },
}).addJob(job)
