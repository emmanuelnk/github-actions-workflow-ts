import {
  Workflow,
  NormalJob,
  Step,
  Context,
  Diagnostics,
} from '@github-actions-workflow-ts/lib'

// Emit only a warning to confirm sub-error diagnostics do not change exit code.
const reporter = Context.getGlobalWacContext()?.diagnostics
reporter?.emit({
  severity: Diagnostics.DiagnosticSeverity.WARN,
  code: 'simulated-warning',
  message: 'simulated warning from a wac file',
})

const job = new NormalJob('Test', { 'runs-on': 'ubuntu-latest' }).addSteps([
  new Step({ name: 'Noop', run: 'true' }),
])

export const test = new Workflow('warning-emitting-mock', {
  name: 'WarningEmittingMock',
  on: { workflow_dispatch: {} },
}).addJob(job)
