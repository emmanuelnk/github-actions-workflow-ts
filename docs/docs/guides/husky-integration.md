---
sidebar_position: 3
---

# Husky Integration

For seamless automation and to eliminate the possibility of overlooking updates in `*.wac.ts` files, integrate with a pre-commit tool like [Husky](https://github.com/typicode/husky).

With Husky, each commit triggers the `npx gwf build` command, ensuring that your GitHub Actions YAML files consistently reflect the latest modifications.

## Setup

1. **Install Husky**:

```bash npm2yarn
npm install --save-dev husky
npx husky init
```

2. **Add build script to `package.json`**:

```json
{
  "scripts": {
    "build:workflows": "npx gwf build && git add .github/workflows/*.yml"
  }
}
```

3. **Add the pre-commit hook**:

```bash
echo "npm run build:workflows" >> .husky/pre-commit
```

## How It Works

Now every time you commit changes:

1. Husky runs the `build:workflows` script
2. The CLI finds all `*.wac.ts` files and generates YAML
3. Generated files are automatically staged
4. Your commit includes both the TypeScript source and generated YAML

## Example Workflow

```bash
# Make changes to your workflow file
vim workflows/ci.wac.ts

# Stage your changes
git add workflows/ci.wac.ts

# Commit - Husky will auto-generate and stage the YAML
git commit -m "feat: add linting step to CI"
# The .github/workflows/ci.yml is automatically regenerated and included
```

## Troubleshooting

### Pre-commit hook not running

Make sure Husky is properly initialized:

```bash
npx husky install
```

### Generated files not being staged

Ensure your `build:workflows` script includes `git add`:

```json
{
  "scripts": {
    "build:workflows": "npx gwf build && git add .github/workflows/*.yml"
  }
}
```

### Skipping the hook

In rare cases where you need to skip the pre-commit hook:

```bash
git commit --no-verify -m "your message"
```

Use this sparingly, as it bypasses the automatic generation.
