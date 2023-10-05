# stable bytes

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { blob, Canister, ic, query } from 'azle';

export default Canister({
    stableBytes: query([], blob, () => {
        return ic.stableBytes();
    })
});
```
