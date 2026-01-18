---
sidebar_position: 2
---

# Adding Actions

How to contribute new typed actions to `@github-actions-workflow-ts/actions`.

## Requirements

Actions must meet these criteria:

| Criteria | Requirement |
|----------|-------------|
| **Popularity** | 50+ GitHub stars |
| **Commits** | 50+ commits |
| **Activity** | Non-trivial update within last 3 months |
| **Contributors** | 2+ contributors |
| **Age** | Published 6+ months ago |

Actions that don't meet all criteria may still be considered. [Open an issue](https://github.com/emmanuelnk/github-actions-workflow-ts/issues/new) with your justification.

## Adding an Action

1. **Edit the config file**

   Open `packages/actions/scripts/config.ts` and add your action:

   ```typescript
   export const trackedActions: TrackedAction[] = [
     // ... existing actions
     {
       owner: 'owner-name',
       repo: 'action-repo',
       versions: ['v1', 'v2'], // Major versions to support
     },
   ]
   ```

2. **Run the generator**

   ```bash
   pnpm generate-action-types
   ```

   This:
   - Fetches the `action.yml` from GitHub for each version
   - Parses inputs and outputs
   - Generates TypeScript classes

3. **Verify the output**

   Check `packages/actions/src/generated/` for the new files.

4. **Run tests**

   ```bash
   pnpm --filter @github-actions-workflow-ts/actions test
   ```

5. **Submit a PR**

   Include:
   - The config change
   - Generated files
   - A brief description of why this action is useful

## Generated Class Structure

For an action like `actions/checkout@v4`, the generator creates:

```typescript
export class ActionsCheckoutV4 extends TypedActionStep<
  ActionsCheckoutV4Inputs,
  ActionsCheckoutV4Outputs
> {
  constructor(props: TypedActionStepProps<ActionsCheckoutV4Inputs>) {
    super({
      ...props,
      uses: props.uses ?? 'actions/checkout@v4',
    })
  }
}

export interface ActionsCheckoutV4Inputs {
  repository?: string
  ref?: string
  token?: string
  // ... other inputs from action.yml
}

export interface ActionsCheckoutV4Outputs {
  ref: string
  commit: string
  // ... other outputs from action.yml
}
```

## Troubleshooting

### Action.yml not found

Make sure the action has an `action.yml` or `action.yaml` at the repository root.

### Missing inputs/outputs

Some actions have dynamic or undocumented inputs. You may need to manually add them to the generated file (and document why in your PR).

### Version mismatch

Ensure the version tags (e.g., `v4`) exist in the repository and point to valid releases.
