[**@github-actions-workflow-ts/lib**](../../../../README.md)

***

[@github-actions-workflow-ts/lib](../../../../README.md) / [GeneratedWorkflowTypes](../README.md) / ServiceContainer

# Interface: ServiceContainer

Defined in: [types/githubActionsWorkflow.ts:1334](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1334)

## Properties

### command?

> `optional` **command?**: `string`

Defined in: [types/githubActionsWorkflow.ts:1374](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1374)

Overrides the Docker image's default command (`CMD`). The value is passed as arguments after the image name in the `docker create` command. If you also specify `entrypoint`, `command` provides the arguments to that entrypoint.

***

### credentials?

> `optional` **credentials?**: `object`

Defined in: [types/githubActionsWorkflow.ts:1342](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1342)

If the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password. The credentials are the same values that you would provide to the `docker login` command.

#### Index Signature

\[`k`: `string`\]: `unknown`

#### password?

> `optional` **password?**: `string`

#### username?

> `optional` **username?**: `string`

***

### entrypoint?

> `optional` **entrypoint?**: `string`

Defined in: [types/githubActionsWorkflow.ts:1378](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1378)

Overrides the Docker image's default `ENTRYPOINT`. The value is a single string defining the executable to run. Use this when you need to replace the image's entrypoint entirely. You can combine `entrypoint` with `command` to pass arguments to the custom entrypoint.

***

### env?

> `optional` **env?**: `string` \| \{\[`k`: `string`\]: `string` \| `number` \| `boolean`; \}

Defined in: [types/githubActionsWorkflow.ts:1350](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1350)

Sets a map of environment variables in the service container.

***

### image

> **image**: `string`

Defined in: [types/githubActionsWorkflow.ts:1338](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1338)

The Docker image to use as the service container to run the action. The value can be the Docker Hub image name or a registry name.

***

### options?

> `optional` **options?**: `string`

Defined in: [types/githubActionsWorkflow.ts:1370](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1370)

Additional Docker container resource options. For a list of options, see https://docs.docker.com/engine/reference/commandline/create/#options.

***

### ports?

> `optional` **ports?**: \[`string` \| `number`, ...(string \| number)\[\]\]

Defined in: [types/githubActionsWorkflow.ts:1359](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1359)

Sets an array of ports to expose on the service container.

***

### volumes?

> `optional` **volumes?**: \[`string`, `...string[]`\]

Defined in: [types/githubActionsWorkflow.ts:1366](https://github.com/emmanuelnk/github-actions-workflow-ts/blob/204cfff36f251549b6101484013006e38b3d20bf/packages/lib/src/types/githubActionsWorkflow.ts#L1366)

Sets an array of volumes for the service container to use. You can use volumes to share data between services or other steps in a job. You can specify named Docker volumes, anonymous Docker volumes, or bind mounts on the host.
To specify a volume, you specify the source and destination path: \<source\>:\<destinationPath\>
The \<source\> is a volume name or an absolute path on the host machine, and \<destinationPath\> is an absolute path in the container.
