# canister version

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { ic, nat64, $query } from 'azle';

// returns the canister's version number
$query;
export function canisterVersion(): nat64 {
    return ic.canisterVersion();
}
```
