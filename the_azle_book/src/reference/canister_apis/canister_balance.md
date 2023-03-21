# canister balance

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)
-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { ic, nat64, $query } from 'azle';

// returns the amount of cycles available in the canister
$query;
export function canisterBalance(): nat64 {
    return ic.canisterBalance();
}
```
