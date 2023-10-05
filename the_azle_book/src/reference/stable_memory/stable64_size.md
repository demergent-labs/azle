# stable64 size

This section is a work in progress.

Examples:

-   [stable_memory](https://github.com/demergent-labs/azle/tree/main/examples/stable_memory)

```typescript
import { Canister, ic, nat64, query } from 'azle';

export default Canister({
    stable64Size: query([], nat64, () => {
        return ic.stable64Size();
    })
});
```
