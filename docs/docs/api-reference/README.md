**@github-actions-workflow-ts/lib**

***

# @github-actions-workflow-ts/lib

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [Context](@github-actions-workflow-ts/namespaces/Context/README.md) | Context utilities for accessing workflow build context and configuration. |
| [Diagnostics](@github-actions-workflow-ts/namespaces/Diagnostics/README.md) | Diagnostics utilities for validating workflows and reporting issues. Includes severity levels, rule configurations, and suppression handling. |
| [ExtendedWorkflowTypes](@github-actions-workflow-ts/namespaces/ExtendedWorkflowTypes/README.md) | Extended workflow types that provide additional type definitions beyond the official GitHub Actions schema. |
| [GeneratedWorkflowTypes](@github-actions-workflow-ts/namespaces/GeneratedWorkflowTypes/README.md) | Auto-generated TypeScript types from the official GitHub Actions workflow JSON schema. These types provide full type safety for workflow configurations. |

## Classes

| Class | Description |
| ------ | ------ |
| [NormalJob](classes/NormalJob.md) | Represents a standard GitHub Actions job that runs on a specified runner. |
| [ReusableWorkflowCallJob](classes/ReusableWorkflowCallJob.md) | Represents a job that calls a reusable workflow. |
| [Step](classes/Step.md) | Represents a single step within a GitHub Actions job. |
| [Workflow](classes/Workflow.md) | Represents a GitHub Actions workflow. |

## Variables

| Variable | Description |
| ------ | ------ |
| [echoKeyValue](variables/echoKeyValue.md) | Utility methods to echo key-value pairs to various targets. |
| [expressions](variables/expressions.md) | Utility methods to generate specific Github Actions workflow expressions. |
| [workflowOps](variables/workflowOps.md) | Utility methods related to GitHub workflow operations. |

## Functions

| Function | Description |
| ------ | ------ |
| [dedentString](functions/dedentString.md) | Strips leading whitespace from a template literal string while preserving relative indentation. Useful for writing inline multi-line strings (like scripts) that render cleanly in YAML. |
| [multilineString](functions/multilineString.md) | Joins multiple strings with newline characters to create a multi-line YAML string. |
