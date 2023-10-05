# reply

This section is a work in progress.

Examples:

-   [composite_queries](https://github.com/demergent-labs/azle/tree/main/examples/composite_queries)
-   [manual_reply](https://github.com/demergent-labs/azle/tree/main/examples/manual_reply)

```typescript
import { blob, Canister, ic, Manual, update } from 'azle';

export default Canister({
    updateBlob: update(
        [],
        Manual(blob),
        () => {
            ic.reply(
                new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
                blob
            );
        },
        { manual: true }
    )
});
```
