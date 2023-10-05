# stable write

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { blob, Canister, ic, nat32, update, Void } from 'azle';

export default Canister({
    stableWrite: update([nat32, blob], Void, (offset, buf) => {
        ic.stableWrite(offset, buf);
    })
});
```
