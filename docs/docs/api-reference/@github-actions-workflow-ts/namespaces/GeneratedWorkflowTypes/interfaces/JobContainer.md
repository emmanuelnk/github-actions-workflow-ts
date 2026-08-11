[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / JobContainer

# Interface: JobContainer

Defined in: [types/githubActionsWorkflow.ts:1294](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1294)

## Properties

### credentials?

> `optional` **credentials?**: `object`

Defined in: [types/githubActionsWorkflow.ts:1302](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1302)

If the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password. The credentials are the same values that you would provide to the `docker login` command.

#### Index Signature

\[`k`: `string`\]: `unknown`

#### password?

> `optional` **password?**: `string`

#### username?

> `optional` **username?**: `string`

***

### env?

> `optional` **env?**: `string` \| \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \}

Defined in: [types/githubActionsWorkflow.ts:1310](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1310)

Sets a map of environment variables in the container.

***

### image

> **image**: `string`

Defined in: [types/githubActionsWorkflow.ts:1298](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1298)

The Docker image to use as the container to run the action. The value can be the Docker Hub image name or a registry name.

***

### options?

> `optional` **options?**: `string`

Defined in: [types/githubActionsWorkflow.ts:1330](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1330)

Additional Docker container resource options. For a list of options, see https://docs.docker.com/engine/reference/commandline/create/#options.

***

### ports?

> `optional` **ports?**: \[`string` \| `number`, ...(string \| number)\[\]\]

Defined in: [types/githubActionsWorkflow.ts:1319](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1319)

Sets an array of ports to expose on the container.

***

### volumes?

> `optional` **volumes?**: \[`string`, `...string[]`\]

Defined in: [types/githubActionsWorkflow.ts:1326](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/dae6ba994b1de98d71184ab9e4086983970f9157/packages/lib/src/types/githubActionsWorkflow.ts#L1326)

Sets an array of volumes for the container to use. You can use volumes to share data between services or other steps in a job. You can specify named Docker volumes, anonymous Docker volumes, or bind mounts on the host.
To specify a volume, you specify the source and destination path: \<source\>:\<destinationPath\>
The \<source\> is a volume name or an absolute path on the host machine, and \<destinationPath\> is an absolute path in the container.
