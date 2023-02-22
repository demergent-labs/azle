# canister balance 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)
-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { ic, nat, $query } from 'azle';

// returns the amount of cycles available in the canister
$query;
export function canister_balance128(): nat {
    return ic.canister_balance128();
}
```
