/**
 * Configuration for tracked GitHub Actions.
 * Each entry specifies an action owner, repository, and versions to generate types for.
 */
export interface TrackedAction {
  owner: string
  repo: string
  versions: string[]
}

export const trackedActions: TrackedAction[] = [
  // Official GitHub Actions (actions/*)
  { owner: 'actions', repo: 'checkout', versions: ['v3', 'v4', 'v5', 'v6'] },
  { owner: 'actions', repo: 'setup-node', versions: ['v3', 'v4'] },
  { owner: 'actions', repo: 'setup-python', versions: ['v4', 'v5'] },
  { owner: 'actions', repo: 'cache', versions: ['v3', 'v4'] },
  { owner: 'actions', repo: 'upload-artifact', versions: ['v3', 'v4'] },
  { owner: 'actions', repo: 'download-artifact', versions: ['v3', 'v4'] },
  { owner: 'actions', repo: 'github-script', versions: ['v6', 'v7', 'v8'] },

  // GitHub org actions (github/*)
  { owner: 'github', repo: 'codeql-action', versions: ['v2', 'v3'] },

  // Docker actions (docker/*)
  { owner: 'docker', repo: 'login-action', versions: ['v2', 'v3'] },
  { owner: 'docker', repo: 'build-push-action', versions: ['v5', 'v6'] },
  { owner: 'docker', repo: 'setup-buildx-action', versions: ['v2', 'v3'] },

  // AWS actions (aws-actions/*)
  {
    owner: 'aws-actions',
    repo: 'configure-aws-credentials',
    versions: ['v3', 'v4'],
  },
  { owner: 'aws-actions', repo: 'amazon-ecr-login', versions: ['v2'] },
  {
    owner: 'aws-actions',
    repo: 'amazon-ecs-deploy-task-definition',
    versions: ['v2'],
  },
  {
    owner: 'aws-actions',
    repo: 'amazon-ecs-render-task-definition',
    versions: ['v2'],
  },
  { owner: 'aws-actions', repo: 'aws-codebuild-run-build', versions: ['v1'] },
  {
    owner: 'aws-actions',
    repo: 'aws-cloudformation-github-deploy',
    versions: ['v1'],
  },

  // Other popular actions
  { owner: 'softprops', repo: 'action-gh-release', versions: ['v1', 'v2'] },
  { owner: 'peaceiris', repo: 'actions-gh-pages', versions: ['v3', 'v4'] },
  {
    owner: 'release-drafter',
    repo: 'release-drafter',
    versions: ['v6'],
  },
]
