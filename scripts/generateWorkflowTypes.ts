import { promises as fs } from "fs";
import * as path from "path";
import fetch from "node-fetch";
import { compile, JSONSchema } from "json-schema-to-typescript";

const GITHUB_ACTIONS_WORKFLOW_JSON_SCHEMA_URL =
  "https://json.schemastore.org/github-workflow.json";

(async () => {
  const jsonSchema = await fetch(GITHUB_ACTIONS_WORKFLOW_JSON_SCHEMA_URL).then(
    (response) => response.json(),
  );

  const outputPath = path.join(
    process.cwd(),
    "src",
    "types",
    "githubActionsWorkflow.ts",
  );

  const workflowTypes = await compile(jsonSchema as JSONSchema, "Workflow");

  await fs.writeFile(outputPath, workflowTypes);
})();
