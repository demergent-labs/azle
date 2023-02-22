# stable64 write

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { blob, ic, nat64, $update } from 'azle';

$update;
export function stable64_write(offset: nat64, buf: blob): void {
    ic.stable64_write(offset, buf);
}
```
