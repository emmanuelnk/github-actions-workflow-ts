---
sidebar_position: 1
---

# Development Setup

Get started contributing to github-actions-workflow-ts.

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/)

## Setup

1. **Fork the repository**

   [Fork on GitHub](https://github.com/emmanuelnk/github-actions-workflow-ts/fork)

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/github-actions-workflow-ts.git
   cd github-actions-workflow-ts
   ```

3. **Create a branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

4. **Install dependencies**

   ```bash
   pnpm install
   ```

## Project Structure

```
github-actions-workflow-ts/
├── packages/
│   ├── lib/           # Core library (@github-actions-workflow-ts/lib)
│   ├── cli/           # CLI tool (@github-actions-workflow-ts/cli)
│   └── actions/       # Typed actions (@github-actions-workflow-ts/actions)
├── docs/              # Documentation site (Docusaurus)
├── workflows/         # Project's own workflow files
├── examples/          # Example workflow files
└── scripts/           # Build and generation scripts
```

## Common Commands

```bash
# Run tests for all packages
pnpm test

# Build all packages
pnpm build

# Generate workflow types from schema
pnpm generate-workflow-types

# Generate typed action classes
pnpm generate-action-types

# Generate YAML from .wac.ts files
pnpm gwf
```

## Running Tests

```bash
# All packages
pnpm test

# Specific package
pnpm --filter @github-actions-workflow-ts/lib test
pnpm --filter @github-actions-workflow-ts/cli test
pnpm --filter @github-actions-workflow-ts/actions test
```

## Submitting Changes

### Creating a Pull Request

1. **Sync your fork**

   ```bash
   git remote add upstream git@github.com:emmanuelnk/github-actions-workflow-ts.git
   git checkout main
   git pull upstream main
   ```

2. **Rebase and push**

   ```bash
   git checkout feat/your-feature-name
   git rebase main
   git push --set-upstream origin feat/your-feature-name
   ```

3. **Create the PR on GitHub**

### Rebasing Your PR

If asked to rebase:

```bash
git checkout feat/your-feature-name
git pull --rebase upstream main
git push --force-with-lease feat/your-feature-name
```

## Code Style

- TypeScript strict mode enabled
- Prettier for formatting
- ESLint for linting
- 100% test coverage required for `packages/lib`

Pre-commit hooks run automatically via Husky to ensure code quality.

## Merge Requirements

- CI passing
- Maintainer approval
- No requested changes
- Up to date with main
