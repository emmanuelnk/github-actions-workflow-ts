import {
  Workflow,
  NormalJob,
  Step,
  dedentString,
} from '../packages/lib/src/index.js'

const checkout = new Step({
  name: 'Checkout',
  uses: 'actions/checkout@v4',
})

const installNode = new Step({
  name: 'Install Node',
  uses: 'actions/setup-node@v4',
  with: { 'node-version': 20 },
})

const installGlobalTsx = new Step({
  name: 'Install tsx',
  run: 'npm install -g tsx',
})

const installPnpm = new Step({
  name: 'Install pnpm',
  uses: 'pnpm/action-setup@v4',
  with: { version: 9 },
})

const installDependencies = new Step({
  name: 'Install Dependencies',
  run: 'pnpm install --no-frozen-lockfile',
})

const generateWorkflowTypes = new Step({
  name: 'Generate Workflow Types',
  run: 'pnpm generate-workflow-types',
})

const gitDiff = new Step({
  name: 'Get git diff',
  run: `git diff -- packages/lib`,
})

const isGitDiffEmpty = new Step({
  name: 'Fail if git diff is not empty',
  run: dedentString(`
    if test -z "$(git diff --name-only -- packages/lib)"; then
      echo "No file changes detected."
      exit 0
    else
      echo "File changes detected."
      git diff -- packages/lib
      exit 1
    fi
  `),
})

const schemaChangeCheck = new NormalJob('SchemaChangeCheck', {
  'runs-on': 'ubuntu-latest',
  permissions: {
    contents: 'write',
  },
}).addSteps([
  checkout,
  installNode,
  installGlobalTsx,
  installPnpm,
  installDependencies,
  generateWorkflowTypes,
  gitDiff,
  isGitDiffEmpty,
])

const checkExistingPR = new Step({
  name: 'Check for existing schema update PR',
  id: 'check-pr',
  uses: 'actions/github-script@v7',
  with: {
    script: dedentString(`
      const { repo, owner } = context.repo;
      const pulls = await github.rest.pulls.list({
        owner,
        repo,
        state: 'open',
        head: \`\${owner}:chore/schema-update-\`
      });
      const schemaUpdatePRs = pulls.data.filter(pr => pr.head.ref.startsWith('chore/schema-update-'));
      if (schemaUpdatePRs.length > 0) {
        console.log(\`Found existing schema update PR: \${schemaUpdatePRs[0].html_url}\`);
        core.setOutput('exists', 'true');
        core.setOutput('pr_url', schemaUpdatePRs[0].html_url);
      } else {
        console.log('No existing schema update PR found');
        core.setOutput('exists', 'false');
      }
    `),
  },
})

const getBranchName = new Step({
  name: 'Get branch name',
  id: 'branch-name',
  if: "steps.check-pr.outputs.exists == 'false'",
  run: 'echo "branch=chore/schema-update-$(date +%y%m%d)" >> $GITHUB_OUTPUT',
})

const configureGit = new Step({
  name: 'Configure git',
  if: "steps.check-pr.outputs.exists == 'false'",
  run: dedentString(`
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
  `),
})

const createBranchAndCommit = new Step({
  name: 'Create branch and commit changes',
  if: "steps.check-pr.outputs.exists == 'false'",
  run: dedentString(`
    git checkout -b \${{ steps.branch-name.outputs.branch }}
    git add packages/lib
    git commit -m "chore: update types" --no-verify
  `),
})

const pushBranch = new Step({
  name: 'Push branch',
  if: "steps.check-pr.outputs.exists == 'false'",
  run: 'git push origin ${{ steps.branch-name.outputs.branch }}',
})

const createPullRequest = new Step({
  name: 'Create Pull Request',
  if: "steps.check-pr.outputs.exists == 'false'",
  uses: 'actions/github-script@v7',
  with: {
    script: dedentString(`
      const { repo, owner } = context.repo;
      const branchName = '\${{ steps.branch-name.outputs.branch }}';
      const result = await github.rest.pulls.create({
        owner,
        repo,
        title: 'chore: update types',
        head: branchName,
        base: 'main',
        body: 'Automated PR to update workflow types due to schema changes.'
      });
      console.log(\`PR created: \${result.data.html_url}\`);

      await github.rest.pulls.requestReviewers({
        owner,
        repo,
        pull_number: result.data.number,
        reviewers: ['emmanuelnk', 'copilot-pull-request-reviewer[bot]'],
      });
      console.log('Reviewers requested');
    `),
  },
})

const createSchemaUpdatePR = new NormalJob('CreateSchemaUpdatePR', {
  'runs-on': 'ubuntu-latest',
  needs: ['SchemaChangeCheck'],
  if: 'failure()',
  permissions: {
    contents: 'write',
    'pull-requests': 'write',
    actions: 'write',
  },
}).addSteps([
  checkout,
  installNode,
  installGlobalTsx,
  installPnpm,
  installDependencies,
  generateWorkflowTypes,
  checkExistingPR,
  getBranchName,
  configureGit,
  createBranchAndCommit,
  pushBranch,
  createPullRequest,
])

export const schemaChangeCheckWorkflow = new Workflow('schema-change-check', {
  name: 'Schema Change Check',
  on: {
    pull_request: {
      types: ['opened', 'reopened', 'synchronize'],
    },
    schedule: [{ cron: '0 0 * * *' }],
    workflow_dispatch: {},
  },
}).addJobs([schemaChangeCheck, createSchemaUpdatePR])
