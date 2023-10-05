# stable64 write

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { blob, Canister, ic, nat64, update, Void } from 'azle';

export default Canister({
    stable64Write: update([nat64, blob], Void, (offset, buf) => {
        ic.stable64Write(offset, buf);
    })
});
```
