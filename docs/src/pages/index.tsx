import type { ReactNode } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'

import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/installation"
          >
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/getting-started/quick-start"
            style={{ marginLeft: '1rem' }}
          >
            Quick Start
          </Link>
        </div>
      </div>
    </header>
  )
}

function Feature({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Feature
            title="Type Safety"
            description="Full TypeScript support with auto-generated types from the official GitHub Actions schema. Catch errors at compile time."
          />
          <Feature
            title="Reusable Components"
            description="Define steps, jobs, and workflows once and reuse them across your projects. No more copy-pasting YAML."
          />
          <Feature
            title="Zero Dependencies"
            description="The core library has zero runtime dependencies and works in both ESM and CommonJS projects."
          />
        </div>
      </div>
    </section>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title="Home"
      description="Write GitHub Actions workflows in TypeScript instead of YAML"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <Heading as="h2" className="text--center">
                Quick Example
              </Heading>
              <pre
                style={{
                  backgroundColor: 'var(--ifm-code-background)',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                }}
              >
                <code>{`import { Workflow, NormalJob, Step } from '@github-actions-workflow-ts/lib'

const testJob = new NormalJob('test', {
  'runs-on': 'ubuntu-latest',
}).addStep(new Step({
  name: 'Run tests',
  run: 'npm test',
}))

export const ci = new Workflow('ci', {
  name: 'CI',
  on: { push: { branches: ['main'] } },
}).addJob(testJob)`}</code>
              </pre>
              <div className="text--center margin-top--md">
                <Link
                  className="button button--primary button--lg"
                  to="/docs/getting-started/quick-start"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
