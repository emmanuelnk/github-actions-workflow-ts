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

  // Custom domain will be set via CNAME file in static/
  url: 'https://emmanuelnk.github.io',
  baseUrl: '/github-actions-workflow-ts/',

  organizationName: 'emmanuelnk',
  projectName: 'github-actions-workflow-ts',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // TypeDoc plugin disabled temporarily - needs MDX compatibility fixes
  // plugins: [
  //   [
  //     'docusaurus-plugin-typedoc',
  //     {
  //       entryPoints: ['../packages/lib/src/index.ts'],
  //       tsconfig: '../packages/lib/tsconfig.json',
  //       out: 'docs/api-reference',
  //       readme: 'none',
  //       indexFormat: 'table',
  //     },
  //   ],
  // ],

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
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        // TODO: Re-enable when TypeDoc MDX compatibility is fixed
        // {
        //   to: '/docs/api-reference/',
        //   label: 'API',
        //   position: 'left',
        // },
        {
          href: 'https://github.com/emmanuelnk/github-actions-workflow-ts',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/@github-actions-workflow-ts/lib',
          label: 'npm',
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
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            // TODO: Re-enable when TypeDoc MDX compatibility is fixed
            // {
            //   label: 'API Reference',
            //   to: '/docs/api-reference/',
            // },
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
