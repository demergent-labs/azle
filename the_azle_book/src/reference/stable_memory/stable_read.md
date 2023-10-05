# stable read

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { blob, Canister, ic, nat32, query } from 'azle';

export default Canister({
    stableRead: query([nat32, nat32], blob, (offset, length) => {
        return ic.stableRead(offset, length);
    })
});
```
