# Contributing

Thank you for considering contributing to github-actions-workflow-ts!

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/)

### Setup

1. [Fork the repository](https://github.com/emmanuelnk/github-actions-workflow-ts/fork)
2. Create a branch with a descriptive name:
   ```sh
   git checkout -b feat/325-add-some-new-feature
   ```
3. Install dependencies:
   ```sh
   pnpm install
   ```

## How to Contribute

### Reporting Bugs & Requesting Features

- Use the [issue tracker][new issue] for bugs, feature requests and general questions.

### Adding New Actions

When contributing actions to `@github-actions-workflow-ts/actions`, the action must meet these criteria:

| Criteria | Requirement |
|----------|-------------|
| **Popularity** | 50+ GitHub stars |
| **Commits** | 50+ commits |
| **Activity** | Non-trivial update within last 3 months |
| **Contributors** | 2+ contributors |
| **Age** | Published 6+ months ago |

Actions that don't meet all criteria may still be considered. [Open a new issue][new issue] with your justification.

## Submitting Changes

### Creating a Pull Request

1. Sync your main branch:
   ```sh
   git remote add upstream git@github.com:emmanuelnk/github-actions-workflow-ts.git
   git checkout main
   git pull upstream main
   ```

2. Rebase and push your branch:
   ```sh
   git checkout feat/325-add-some-new-feature
   git rebase main
   git push --set-upstream origin feat/325-add-some-new-feature
   ```

3. [Create a Pull Request](https://help.github.com/articles/creating-a-pull-request)

### Rebasing Your PR

If asked to rebase:

```sh
git checkout feat/325-add-some-new-feature
git pull --rebase upstream main
git push --force-with-lease feat/325-add-some-new-feature
```

Learn more: [Git Rebasing][git rebasing] | [Interactive Rebase][interactive rebase]

## For Maintainers

### Merge Requirements

- CI passing
- 2 maintainer approvals (1 if opened by maintainer)
- No requested changes
- Up to date with main

[new issue]: https://github.com/emmanuelnk/github-actions-workflow-ts/issues/new
[git rebasing]: https://git-scm.com/book/en/Git-Branching-Rebasing
[interactive rebase]: https://help.github.com/en/github/using-git/about-git-rebase
