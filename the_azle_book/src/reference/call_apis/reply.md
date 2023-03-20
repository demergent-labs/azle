# reply

This section is a work in progress.

Examples:

-   [composite_queries](https://github.com/demergent-labs/azle/tree/main/examples/composite_queries)
-   [manual_reply](https://github.com/demergent-labs/azle/tree/main/examples/manual_reply)

```typescript
import { ic, Manual, $update } from 'azle';

$update;
export function updateBlob(): Manual<blob> {
    ic.reply(new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]));
}
```
