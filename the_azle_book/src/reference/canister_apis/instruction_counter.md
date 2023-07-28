# instruction counter

This section is a work in progress.

Examples:

-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)

```typescript
import { ic, nat64, $query } from 'azle';

// Returns the number of instructions that the canister executed since the last
// entry point.
$query;
export function instructionCounter(): nat64 {
    return ic.instructionCounter();
}
```
