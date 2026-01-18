import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'github-actions-workflow-ts',
  tagline: 'Write GitHub Actions workflows in TypeScript instead of YAML',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // URL will be set by Vercel automatically, this is a fallback
  url: 'https://github-actions-workflow-ts.vercel.app',
  baseUrl: '/',

  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // TypeDoc is run separately via `pnpm generate-api-docs` before build
  // to allow fixing MDX compatibility issues with angle brackets in JSDoc comments
  plugins: [],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/emmanuelnk/github-actions-workflow-ts/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // image: 'img/social-card.png', // TODO: Add social card image
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'github-actions-workflow-ts',
      logo: {
        alt: 'github-actions-workflow-ts Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/api-reference/',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/emmanuelnk/github-actions-workflow-ts',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://www.npmjs.com/package/@github-actions-workflow-ts/lib',
          position: 'right',
          className: 'header-npm-link',
          'aria-label': 'npm package',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference/',
            },
          ],
        },
        {
          title: 'Packages',
          items: [
            {
              label: '@github-actions-workflow-ts/lib',
              href: 'https://www.npmjs.com/package/@github-actions-workflow-ts/lib',
            },
            {
              label: '@github-actions-workflow-ts/cli',
              href: 'https://www.npmjs.com/package/@github-actions-workflow-ts/cli',
            },
            {
              label: '@github-actions-workflow-ts/actions',
              href: 'https://www.npmjs.com/package/@github-actions-workflow-ts/actions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/emmanuelnk/github-actions-workflow-ts',
            },
            {
              label: 'Issues',
              href: 'https://github.com/emmanuelnk/github-actions-workflow-ts/issues',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} github-actions-workflow-ts. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
