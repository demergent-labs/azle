# stable size

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { Canister, ic, nat32, query } from 'azle';

export default Canister({
    stableSize: query([], nat32, () => {
        return ic.stableSize();
    })
});
```
