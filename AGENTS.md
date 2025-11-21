# Agent Guide

## Setup
```bash
pnpm install
```

## Schema Change Fix
1. When the schema (source: schemastore) changes, we want to update the types:
  ```bash
  pnpm generate-workflow-types
  ```
2. After the types have been generated, run tests to ensure tests still pass.
   ```
   pnpm test
   ```
   Ensure Coverage remains at 100%. If not, create the necessary test(s) to keep it at 100%.

3. Commit the change
   a. The branch name should be of the format `chore/schema-update-YYMMDD` if the change only contains schema changes. If the branch contains more changes, use conventional commit and branch naming style.
   b. The commit message should have the title format `chore: update types` if only schema changes else use conventional commit style.
   c. You can add more detail to the commit message but be succint and concise.
   d. Finally, the pre-commit script will run and ensure that workflow files are regenerated. 

4. Create the pull request
   a. When you create the PR, be equally succinct and concise in the PR description.
   b. Tests will run when the PR is created.

5. Once everything is okay I will merge the PR after review.
