# canister balance

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)
-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { Canister, ic, nat64, query } from 'azle';

export default Canister({
    // returns the amount of cycles available in the canister
    canisterBalance: query([], nat64, () => {
        return ic.canisterBalance();
    })
});
```
