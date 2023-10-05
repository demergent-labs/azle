# stable grow

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { Canister, ic, nat32, update } from 'azle';

export default Canister({
    stableGrow: update([nat32], nat32, (newPages) => {
        return ic.stableGrow(newPages);
    })
});
```
