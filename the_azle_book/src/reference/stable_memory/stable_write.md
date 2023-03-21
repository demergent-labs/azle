# stable write

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { blob, ic, nat32, $update } from 'azle';

$update;
export function stableWrite(offset: nat32, buf: blob): void {
    ic.stableWrite(offset, buf);
}
```
