# stable size

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { ic, nat32, $query } from 'azle';

$query;
export function stableSize(): nat32 {
    return ic.stableSize();
}
```
