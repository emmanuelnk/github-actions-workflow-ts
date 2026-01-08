import {
  Workflow,
  NormalJob,
  Step,
  expressions as ex,
} from '../packages/lib/src/index.js'

const prLabelerStep = new Step({
  name: 'Apply label to a PR',
  uses: 'TimonVS/pr-labeler-action@v4',
  with: {
    'repo-token': ex.secret('GITHUB_TOKEN'),
    'configuration-path': '.github/pr-labeler.yml',
  },
})

const draftJob = new NormalJob('PrLabeler', {
  'runs-on': 'ubuntu-latest',
  'timeout-minutes': 20,
  permissions: {
    contents: 'read',
    'pull-requests': 'write',
  },
}).addStep(prLabelerStep)

export const draftWorkflow = new Workflow('pr-labeler', {
  name: 'PR Labeler',
  on: {
    pull_request_target: {
      types: ['opened', 'reopened', 'synchronize'],
    },
  },
  permissions: {
    contents: 'read',
  },
}).addJob(draftJob)
