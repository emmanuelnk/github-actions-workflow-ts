[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / Step

# Type Alias: Step

> **Step** = `object` & [`Step1`](Step1.md) & `object` & [`Step1`](Step1.md)

Defined in: [types/githubActionsWorkflow.ts:513](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/eebca346c5d3851308757dca396950e32e615bc7/packages/lib/src/types/githubActionsWorkflow.ts#L513)

## Type Declaration

### continue-on-error?

> `optional` **continue-on-error**: `boolean` \| [`ExpressionSyntax`](ExpressionSyntax.md)

Prevents a job from failing when a step fails. Set to true to allow a job to pass when this step fails.

### env?

> `optional` **env**: \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \} \| [`StringContainingExpressionSyntax`](StringContainingExpressionSyntax.md)

Sets environment variables for steps to use in the virtual environment. You can also set environment variables for the entire workflow or a job.

### id?

> `optional` **id**: `string`

A unique identifier for the step. You can use the id to reference the step in contexts. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.

### if?

> `optional` **if**: `boolean` \| `number` \| `string`

You can use the if conditional to prevent a step from running unless a condition is met. You can use any supported context and expression to create a conditional.
Expressions in an if conditional do not require the $\{\{ \}\} syntax. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.

### name?

> `optional` **name**: `string`

A name for your step to display on GitHub.

### run?

> `optional` **run**: `string`

Runs command-line programs using the operating system's shell. If you do not provide a name, the step name will default to the text specified in the run command.
Commands run using non-login shells by default. You can choose a different shell and customize the shell used to run commands. For more information, see https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#using-a-specific-shell.
Each run keyword represents a new process and shell in the virtual environment. When you provide multi-line commands, each line runs in the same shell.

### shell?

> `optional` **shell**: [`Shell`](Shell.md)

### timeout-minutes?

> `optional` **timeout-minutes**: `number` \| [`ExpressionSyntax`](ExpressionSyntax.md)

The maximum number of minutes to run the step before killing the process.

### uses?

> `optional` **uses**: `string`

Selects an action to run as part of a step in your job. An action is a reusable unit of code. You can use an action defined in the same repository as the workflow, a public repository, or in a published Docker container image (https://hub.docker.com/).
We strongly recommend that you include the version of the action you are using by specifying a Git ref, SHA, or Docker tag number. If you don't specify a version, it could break your workflows or cause unexpected behavior when the action owner publishes an update.
- Using the commit SHA of a released action version is the safest for stability and security.
- Using the specific major action version allows you to receive critical fixes and security patches while still maintaining compatibility. It also assures that your workflow should still work.
- Using the master branch of an action may be convenient, but if someone releases a new major version with a breaking change, your workflow could break.
Some actions require inputs that you must set using the with keyword. Review the action's README file to determine the inputs required.
Actions are either JavaScript files or Docker containers. If the action you're using is a Docker container you must run the job in a Linux virtual environment. For more details, see https://help.github.com/en/articles/virtual-environments-for-github-actions.

### with?

> `optional` **with**: [`Env`](Env.md)

### working-directory?

> `optional` **working-directory**: [`WorkingDirectory`](WorkingDirectory.md)

## Type Declaration

### continue-on-error?

> `optional` **continue-on-error**: `boolean` \| [`ExpressionSyntax`](ExpressionSyntax.md)

Prevents a job from failing when a step fails. Set to true to allow a job to pass when this step fails.

### env?

> `optional` **env**: \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \} \| [`StringContainingExpressionSyntax`](StringContainingExpressionSyntax.md)

Sets environment variables for steps to use in the virtual environment. You can also set environment variables for the entire workflow or a job.

### id?

> `optional` **id**: `string`

A unique identifier for the step. You can use the id to reference the step in contexts. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.

### if?

> `optional` **if**: `boolean` \| `number` \| `string`

You can use the if conditional to prevent a step from running unless a condition is met. You can use any supported context and expression to create a conditional.
Expressions in an if conditional do not require the $\{\{ \}\} syntax. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.

### name?

> `optional` **name**: `string`

A name for your step to display on GitHub.

### run?

> `optional` **run**: `string`

Runs command-line programs using the operating system's shell. If you do not provide a name, the step name will default to the text specified in the run command.
Commands run using non-login shells by default. You can choose a different shell and customize the shell used to run commands. For more information, see https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#using-a-specific-shell.
Each run keyword represents a new process and shell in the virtual environment. When you provide multi-line commands, each line runs in the same shell.

### shell?

> `optional` **shell**: [`Shell`](Shell.md)

### timeout-minutes?

> `optional` **timeout-minutes**: `number` \| [`ExpressionSyntax`](ExpressionSyntax.md)

The maximum number of minutes to run the step before killing the process.

### uses?

> `optional` **uses**: `string`

Selects an action to run as part of a step in your job. An action is a reusable unit of code. You can use an action defined in the same repository as the workflow, a public repository, or in a published Docker container image (https://hub.docker.com/).
We strongly recommend that you include the version of the action you are using by specifying a Git ref, SHA, or Docker tag number. If you don't specify a version, it could break your workflows or cause unexpected behavior when the action owner publishes an update.
- Using the commit SHA of a released action version is the safest for stability and security.
- Using the specific major action version allows you to receive critical fixes and security patches while still maintaining compatibility. It also assures that your workflow should still work.
- Using the master branch of an action may be convenient, but if someone releases a new major version with a breaking change, your workflow could break.
Some actions require inputs that you must set using the with keyword. Review the action's README file to determine the inputs required.
Actions are either JavaScript files or Docker containers. If the action you're using is a Docker container you must run the job in a Linux virtual environment. For more details, see https://help.github.com/en/articles/virtual-environments-for-github-actions.

### with?

> `optional` **with**: [`Env`](Env.md)

### working-directory?

> `optional` **working-directory**: [`WorkingDirectory`](WorkingDirectory.md)
