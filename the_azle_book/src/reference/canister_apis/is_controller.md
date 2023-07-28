# is controller

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { ic, Principal, $query } from 'azle';

// determines whether the given principal is a controller of the canister
$query;
export function isController(principal: Principal): boolean {
    return ic.isController(principal);
}
```
