import { Configuration } from './githubActionsWorkflow'

export type MatrixConfiguration = string | [Configuration, ...Configuration[]]
