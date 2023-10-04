# canister version

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { Canister, ic, nat64, query } from 'azle';

export default Canister({
    // returns the canister's version number
    canisterVersion: query([], nat64, () => {
        return ic.canisterVersion();
    })
});
```
