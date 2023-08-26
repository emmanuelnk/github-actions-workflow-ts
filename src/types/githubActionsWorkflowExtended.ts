import { NormalJob } from "./githubActionsWorkflow";

/**
 * Non-generated types
 */
type ElementOf<T> = T extends Array<infer U> ? U : never;

/**
 * A job contains a sequence of tasks called steps. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry. Not all steps run actions, but all actions run as a step. Each step runs in its own process in the virtual environment and has access to the workspace and filesystem. Because steps run in their own process, changes to environment variables are not preserved between steps. GitHub provides built-in steps to set up and complete a job.
 * Must contain either `uses` or `run`
 *
 */
export type Step = ElementOf<NormalJob["steps"]>;

/**
 * A job contains a sequence of tasks called steps. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry. Not all steps run actions, but all actions run as a step. Each step runs in its own process in the virtual environment and has access to the workspace and filesystem. Because steps run in their own process, changes to environment variables are not preserved between steps. GitHub provides built-in steps to set up and complete a job.
 * Must contain either `uses` or `run`
 *
 */
export type Steps = NormalJob["steps"];
