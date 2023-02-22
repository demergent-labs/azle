# stable64 read

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { blob, ic, nat64, $query } from 'azle';

$query;
export function stable64_read(offset: nat64, length: nat64): blob {
    return ic.stable64_read(offset, length);
}
```
