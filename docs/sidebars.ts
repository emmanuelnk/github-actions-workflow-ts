import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/migration-from-v1',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/writing-workflows',
        'guides/typed-actions',
        'guides/husky-integration',
        'guides/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/workflow',
        'core-concepts/jobs',
        'core-concepts/steps',
        'core-concepts/helpers',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: ['contributing/development-setup', 'contributing/adding-actions'],
    },
  ],
}

export default sidebars
