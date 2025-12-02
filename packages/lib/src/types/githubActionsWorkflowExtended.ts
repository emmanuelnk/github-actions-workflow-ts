import type { Configuration } from './githubActionsWorkflow.js'

export type MatrixConfiguration = string | [Configuration, ...Configuration[]]
