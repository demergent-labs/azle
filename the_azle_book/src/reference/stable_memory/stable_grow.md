# stable grow

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { ic, nat32, StableGrowResult, $update } from 'azle';

$update;
export function stable_grow(new_pages: nat32): StableGrowResult {
    return ic.stable_grow(new_pages);
}
```
