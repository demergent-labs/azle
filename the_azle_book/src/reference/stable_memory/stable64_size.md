# stable64 size

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { ic, nat64, $query } from 'azle';

$query;
export function stable64Size(): nat64 {
    return ic.stable64Size();
}
```
