# Documentation Site

This directory contains the documentation website for `github-actions-workflow-ts`, built with [Docusaurus](https://docusaurus.io/).

## Quick Start

```bash
# Install dependencies (from repo root)
pnpm install

# Start development server
cd docs
pnpm start
```

The site will be available at `http://localhost:3000/`.

## Project Structure

```
docs/
├── docs/                    # Documentation content (Markdown/MDX)
│   ├── getting-started/     # Installation, quick start, migration guides
│   ├── guides/              # How-to guides
│   ├── core-concepts/       # Conceptual documentation
│   ├── contributing/        # Contributor guides
│   └── api-reference/       # Auto-generated API docs (do not edit manually)
├── src/
│   ├── components/          # React components
│   ├── css/                 # Custom styles
│   └── pages/               # Custom pages (homepage, etc.)
├── static/                  # Static assets (images, favicon)
├── scripts/                 # Build scripts
├── docusaurus.config.ts     # Docusaurus configuration
├── sidebars.ts              # Sidebar navigation structure
└── package.json
```

## Writing Documentation

### Adding a New Page

1. Create a new `.md` or `.mdx` file in the appropriate `docs/` subdirectory
2. Add frontmatter at the top:
   ```markdown
   ---
   sidebar_position: 1
   title: My Page Title
   description: A brief description for SEO
   ---
   ```
3. Add the page to `sidebars.ts` if it's not auto-discovered

### Documentation Guidelines

- Use clear, concise language
- Include code examples where helpful
- Use TypeScript for all code examples
- Link to related pages using relative paths: `[link text](../path/to/page.md)`
- Place images in `static/img/` and reference them as `/img/filename.png`

### MDX Features

You can use React components in MDX files:

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm">npm install package</TabItem>
  <TabItem value="pnpm" label="pnpm">pnpm add package</TabItem>
</Tabs>
```

## API Reference

The API reference is **auto-generated** from TypeScript source code using [TypeDoc](https://typedoc.org/).

### How It Works

1. TypeDoc reads JSDoc comments from `packages/lib/src/`
2. Generates Markdown files in `docs/api-reference/`
3. A post-processing script fixes MDX compatibility issues
4. Docusaurus builds the final HTML

### Updating API Docs

API docs are regenerated on every build. To update them:

1. Update JSDoc comments in the source code (`packages/lib/src/`)
2. Run `pnpm build` in the `docs/` directory

**Do not manually edit files in `docs/api-reference/`** - they will be overwritten.

### JSDoc Best Practices

```typescript
/**
 * Brief description of the function.
 *
 * Longer description with more details if needed.
 *
 * @param paramName - Description of the parameter
 * @returns Description of the return value
 *
 * @example
 * ```typescript
 * const result = myFunction('input')
 * ```
 */
export function myFunction(paramName: string): string {
  // ...
}
```

## Build Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start development server with hot reload |
| `pnpm build` | Generate API docs and build for production |
| `pnpm serve` | Serve the production build locally |
| `pnpm clear` | Clear Docusaurus cache |
| `pnpm generate-api-docs` | Generate TypeDoc API reference only |
| `pnpm typecheck` | Run TypeScript type checking |

## Deployment

The documentation is automatically deployed to Vercel via the GitHub App integration when changes are pushed to the `main` branch.

## Troubleshooting

### Build Fails with MDX Errors

If you see errors about unclosed tags like `<job_id>` or `<input_id>`:

1. These come from JSDoc comments in the source code
2. The `scripts/fix-typedoc-mdx.mjs` script should escape them automatically
3. If the error persists, check if new angle-bracket patterns were added to JSDoc comments

### API Reference Not Updating

1. Delete the generated files: `rm -rf docs/api-reference`
2. Clear the cache: `pnpm clear`
3. Rebuild: `pnpm build`

### Development Server Issues

```bash
# Clear all caches and restart
pnpm clear
rm -rf node_modules/.cache
pnpm start
```

## Configuration

### `docusaurus.config.ts`

Key configuration options:
- `url` / `baseUrl` - Site URL configuration
- `themeConfig.navbar` - Navigation bar items
- `themeConfig.footer` - Footer links
- `themeConfig.prism` - Syntax highlighting languages

### `sidebars.ts`

Defines the documentation sidebar structure. Items can be:
- Document IDs (auto-discovered from file path)
- Category objects with nested items
- External links

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your documentation changes
4. Test locally with `pnpm start`
5. Submit a pull request

For more details, see the main [CONTRIBUTING.md](../CONTRIBUTING.md).
