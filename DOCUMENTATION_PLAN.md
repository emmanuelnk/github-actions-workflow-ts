# Documentation Site Implementation Plan

This document outlines the strategy for creating a comprehensive documentation site for `github-actions-workflow-ts`.

## Current State Analysis

### Problems with Current README

1. **Size**: The main README is ~900 lines covering installation, migration, examples, API reference, helpers, and configuration
2. **Discoverability**: Nested `<details>` blocks hide important information
3. **Navigation**: Table of contents is long and flat - no hierarchy for related topics
4. **Fragmentation**: Documentation spread across multiple files (`README.md`, `packages/*/README.md`, `CONTRIBUTING.md`, `RELEASE_STRATEGY.md`)
5. **No versioning**: Users on older versions have no way to access version-specific docs

### Content to Migrate

| Source File | Content Type |
|-------------|--------------|
| `README.md` | Installation, overview, API reference, helpers, configuration |
| `packages/actions/README.md` | Typed actions usage, available actions table, diagnostics |
| `packages/cli/README.md` | CLI commands, options |
| `packages/lib/README.md` | Core library reference |
| `CONTRIBUTING.md` | Contribution guidelines, adding actions |
| `RELEASE_STRATEGY.md` | Release process (internal) |
| `examples/` | Example workflow files |

---

## Recommendation: Docusaurus

After evaluating alternatives, **Docusaurus** is the recommended choice for this project.

### Why Docusaurus?

| Factor | Docusaurus | MkDocs | VuePress | GitBook |
|--------|------------|--------|----------|---------|
| **Tech Stack Fit** | React/TS (matches project) | Python | Vue.js | Hosted SaaS |
| **TypeScript Support** | Native | Plugin | Partial | N/A |
| **Versioning** | Built-in | Plugin | Plugin | Paid feature |
| **Search** | Algolia (free OSS) | Plugin | Plugin | Built-in |
| **GitHub Pages** | First-class | Supported | Supported | Separate |
| **Learning Curve** | Medium | Low | Medium | Low |
| **Customization** | High (React) | Medium | High (Vue) | Limited |
| **Community** | Large (Meta-backed) | Large | Medium | N/A |

### Why Not Alternatives?

- **MkDocs**: Great tool, but Python-based. This is a TypeScript project - keeping the docs stack consistent reduces context-switching.
- **VuePress**: Vue.js based, doesn't match the React ecosystem many GHA users work in.
- **GitBook**: SaaS with limitations on free tier; less control over hosting and customization.
- **Hugo**: Fast but Go-based templates are harder to customize than React components.

---

## Implementation Plan

### Phase 1: Setup & Structure

#### 1.1 Initialize Docusaurus

```bash
# From project root
npx create-docusaurus@latest docs classic --typescript

# Or add to monorepo
pnpm add -D @docusaurus/core @docusaurus/preset-classic
```

#### 1.2 Workspace Configuration

The `docs` folder is a pnpm workspace package at the root level (not under `packages/` since it doesn't go through the npm release cycle).

Update `pnpm-workspace.yaml`:

```yaml
packages:
  - 'packages/*'
  - 'docs'
```

#### 1.3 Recommended Directory Structure

```
github-actions-workflow-ts/
├── docs/                          # Docusaurus site (workspace package, not published)
│   ├── package.json               # name: "docs", private: true
│   ├── docs/                      # Documentation content
│   │   ├── getting-started/
│   │   │   ├── installation.md
│   │   │   ├── quick-start.md
│   │   │   └── migration-from-v1.md
│   │   ├── guides/
│   │   │   ├── writing-workflows.md
│   │   │   ├── using-typed-actions.md
│   │   │   ├── husky-integration.md
│   │   │   └── configuration.md
│   │   ├── api/
│   │   │   ├── workflow.md
│   │   │   ├── normal-job.md
│   │   │   ├── step.md
│   │   │   ├── reusable-workflow-call-job.md
│   │   │   └── helpers.md
│   │   ├── typed-actions/
│   │   │   ├── overview.md
│   │   │   ├── available-actions.md
│   │   │   └── diagnostics.md
│   │   └── contributing/
│   │       ├── development-setup.md
│   │       └── adding-actions.md
│   ├── blog/                      # Optional: release notes, tutorials
│   ├── src/
│   │   ├── components/            # Custom React components
│   │   ├── css/
│   │   └── pages/
│   ├── static/
│   │   └── img/
│   ├── docusaurus.config.ts
│   └── sidebars.ts
├── packages/                      # Published packages (go through release cycle)
│   ├── lib/
│   ├── cli/
│   └── actions/
├── README.md                      # Simplified - points to docs site
└── ...
```

#### 1.4 Docs Package.json

```json
{
  "name": "docs",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve",
    "clear": "docusaurus clear",
    "typecheck": "tsc"
  },
  "dependencies": {
    "@docusaurus/core": "^3.7.0",
    "@docusaurus/preset-classic": "^3.7.0",
    "prism-react-renderer": "^2.4.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "^3.7.0",
    "@docusaurus/types": "^3.7.0",
    "docusaurus-plugin-typedoc": "^1.4.0",
    "typedoc": "^0.28.0",
    "typedoc-plugin-markdown": "^4.6.0",
    "typescript": "^5.8.0"
  },
  "browserslist": {
    "production": [">0.5%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
```

#### 1.5 Docusaurus Configuration

```typescript
// docs/docusaurus.config.ts
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'github-actions-workflow-ts',
  tagline: 'Write GitHub Actions workflows in TypeScript',
  url: 'https://your-custom-domain.com',  // Your custom domain
  baseUrl: '/',

  organizationName: 'emmanuelnk',
  projectName: 'github-actions-workflow-ts',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/emmanuelnk/github-actions-workflow-ts/tree/main/docs/',
          versions: {
            current: {
              label: 'Next',
              path: 'next',
            },
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/emmanuelnk/github-actions-workflow-ts/tree/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'github-actions-workflow-ts',
      logo: {
        alt: 'Logo',
        src: 'img/logo.png',
      },
      items: [
        { type: 'doc', docId: 'getting-started/installation', position: 'left', label: 'Docs' },
        { type: 'doc', docId: 'api/workflow', position: 'left', label: 'API' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { type: 'docsVersionDropdown', position: 'right' },
        {
          href: 'https://github.com/emmanuelnk/github-actions-workflow-ts',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started/installation' },
            { label: 'API Reference', to: '/docs/api/workflow' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub Issues', href: 'https://github.com/emmanuelnk/github-actions-workflow-ts/issues' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} github-actions-workflow-ts. Built with Docusaurus.`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
      additionalLanguages: ['bash', 'yaml', 'typescript'],
    },
    algolia: {
      // Apply for Algolia DocSearch (free for OSS)
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'github-actions-workflow-ts',
    },
  },
};

export default config;
```

---

### Phase 2: Content Migration

#### 2.1 Simplified README

After migration, the main `README.md` should be ~100-150 lines:

```markdown
# github-actions-workflow-ts

Write GitHub Actions workflows in TypeScript instead of YAML!

[Logo and badges]

## Quick Install

\`\`\`bash
npm install --save-dev @github-actions-workflow-ts/lib @github-actions-workflow-ts/cli
\`\`\`

## Quick Example

\`\`\`typescript
import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

const job = new NormalJob('test', { 'runs-on': 'ubuntu-latest' })
  .addStep(new Step({ name: 'Checkout', uses: 'actions/checkout@v4' }))

export const workflow = new Workflow('ci', {
  name: 'CI',
  on: { push: {} }
}).addJob(job)
\`\`\`

## Documentation

**[View Full Documentation →](https://github-actions-workflow-ts.vercel.app/)**

- [Installation Guide](https://github-actions-workflow-ts.vercel.app/docs/getting-started/installation)
- [Writing Workflows](https://github-actions-workflow-ts.vercel.app/docs/guides/writing-workflows)
- [API Reference](https://github-actions-workflow-ts.vercel.app/docs/api/workflow)
- [Typed Actions](https://github-actions-workflow-ts.vercel.app/docs/typed-actions/overview)

## Contributing

See [Contributing Guide](https://github-actions-workflow-ts.vercel.app/docs/contributing/development-setup)

## License

MIT
```

#### 2.2 Content Mapping

| Current Location | New Location |
|-----------------|--------------|
| README: Installation | `docs/getting-started/installation.md` |
| README: Migration from v1 | `docs/getting-started/migration-from-v1.md` |
| README: Examples | `docs/getting-started/quick-start.md` |
| README: Workflow Classes | `docs/api/workflow.md`, `docs/api/normal-job.md`, `docs/api/step.md` |
| README: Helpers | `docs/api/helpers.md` |
| README: Config file | `docs/guides/configuration.md` |
| README: Husky integration | `docs/guides/husky-integration.md` |
| `packages/actions/README.md` | `docs/typed-actions/` |
| `CONTRIBUTING.md` | `docs/contributing/` |

---

### Phase 3: Enhancements

#### 3.1 Interactive Features

- **Live Code Playground**: Embed CodeSandbox examples directly in docs
- **Copy buttons**: Auto-added by Docusaurus for code blocks
- **Tabs**: Show npm/pnpm/yarn alternatives

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>
    ```bash
    npm install --save-dev @github-actions-workflow-ts/lib
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```bash
    pnpm add -D @github-actions-workflow-ts/lib
    ```
  </TabItem>
</Tabs>
```

#### 3.2 Auto-generated API Docs (Required)

Use TypeDoc integration to auto-generate API docs from TSDoc comments in the source code.

**Installation:**

```bash
pnpm add -D typedoc typedoc-plugin-markdown docusaurus-plugin-typedoc
```

**Configuration in `docs/docusaurus.config.ts`:**

```typescript
plugins: [
  [
    'docusaurus-plugin-typedoc',
    {
      entryPoints: [
        '../packages/lib/src/index.ts',
        '../packages/actions/src/index.ts',
      ],
      tsconfig: '../tsconfig.json',
      out: 'api-reference',
      sidebar: {
        categoryLabel: 'API Reference',
        position: 3,
      },
    },
  ],
],
```

**Benefits:**
- API docs stay in sync with code automatically
- TSDoc comments become browsable documentation
- Type information is fully preserved
- Links between related types work automatically

**Workflow:**
1. Add TSDoc comments to exported classes/functions in source
2. Run `pnpm --filter docs build` - TypeDoc generates markdown
3. Docusaurus builds the final site with API reference included

#### 3.3 Versioning Strategy

```bash
# When releasing v3.0.0
cd docs
npm run docusaurus docs:version 2.2
```

This creates a snapshot at `docs/versioned_docs/version-2.2/`.

---

### Phase 4: Deployment & CI

#### 4.1 GitHub Pages Deployment

The deployment workflow is auto-generated using this project's own tooling. See `workflows/deploy-docs.wac.ts`:

```typescript
// workflows/deploy-docs.wac.ts
// This file generates .github/workflows/deploy-docs.yml
// Run: npx gwf build
```

**Custom Domain Setup:**
1. Add a `CNAME` file in `docs/static/` with your domain
2. Configure DNS with your domain provider
3. Enable HTTPS in GitHub repo settings

```
# docs/static/CNAME
your-custom-domain.com
```

#### 4.2 Preview Deployments

Use Vercel or Netlify for PR preview deployments:

```yaml
# In PR workflow
- name: Deploy Preview
  uses: peaceiris/actions-gh-pages@v4
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./docs/build
    destination_dir: pr-preview/${{ github.event.number }}
```

---

## Local Development

### Running Docs Locally

```bash
# From project root
cd docs

# Start development server (hot reload)
pnpm start
# Opens http://localhost:3000 automatically

# Or build and serve production version
pnpm build
pnpm serve
# Opens http://localhost:3000
```

### Development Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start dev server with hot reload |
| `pnpm build` | Build production static files to `build/` |
| `pnpm serve` | Serve production build locally |
| `pnpm clear` | Clear Docusaurus cache (useful for troubleshooting) |
| `pnpm typecheck` | Run TypeScript type checking |

### From Monorepo Root

```bash
# Using pnpm workspace filter
pnpm --filter docs start
pnpm --filter docs build
```

### What to Check Locally

- Navigation and sidebar structure
- Code syntax highlighting
- Internal links (Docusaurus errors on broken links)
- Mobile responsiveness
- Search functionality (local search plugin recommended for dev)

---

## Maintenance Guide

### Adding New Documentation

1. Create `.md` or `.mdx` file in appropriate `docs/docs/` subdirectory
2. Add to `sidebars.ts` if not auto-discovered
3. Build locally to verify: `pnpm --filter docs start`
4. Commit and push - CI handles deployment

### Updating Documentation

1. Edit the relevant `.md` file
2. For API changes, update both code TSDoc and docs
3. Run `pnpm --filter docs build` to check for broken links

### Version Releases

1. Before major release, snapshot current docs:
   ```bash
   cd docs && npm run docusaurus docs:version X.Y
   ```
2. Update `docusaurus.config.ts` version labels if needed
3. Old versions remain accessible via version dropdown

### Search

1. Apply for [Algolia DocSearch](https://docsearch.algolia.com/) (free for OSS)
2. Or use local search plugin: `@easyops-cn/docusaurus-search-local`

### Keeping Dependencies Updated

```bash
# Check for updates
cd docs && npx npm-check-updates

# Update Docusaurus
pnpm --filter docs update @docusaurus/core @docusaurus/preset-classic
```

---

## Timeline Estimate

| Phase | Tasks |
|-------|-------|
| Phase 1 | Initialize Docusaurus, configure, set up structure |
| Phase 2 | Migrate all content from README and package READMEs |
| Phase 3 | Add interactive features, TypeDoc integration, versioning |
| Phase 4 | Set up CI/CD, Algolia search, PR previews |

---

## Alternatives Considered

| Tool | Pros | Cons | Decision |
|------|------|------|----------|
| **Docusaurus** | React/TS native, versioning, Algolia, large community | Setup complexity | **Selected** |
| **MkDocs** | Simple, fast, great themes | Python-based, separate tooling | Good alternative if simpler is preferred |
| **VuePress** | Vue ecosystem, similar features | Doesn't match project stack | Not recommended |
| **GitBook** | Easy setup, nice UI | SaaS limitations, less control | Not recommended for OSS |
| **Starlight (Astro)** | Modern, fast, content-focused | Newer, smaller community | Worth watching |

---

## Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Algolia DocSearch](https://docsearch.algolia.com/)
- [TypeDoc](https://typedoc.org/)
- [Example: React Native Docs](https://reactnative.dev/) (built with Docusaurus)
- [Example: Jest Docs](https://jestjs.io/) (built with Docusaurus)
