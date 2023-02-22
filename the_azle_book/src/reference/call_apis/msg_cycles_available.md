# msg cycles available

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { ic, nat64, $update } from 'azle';

// Moves all transferred cycles to the canister
$update;
export function receive_cycles(): nat64 {
    return ic.msg_cycles_accept(ic.msg_cycles_available() / 2n);
}
```
