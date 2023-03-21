# msg cycles available 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { ic, nat, $update } from 'azle';

// Moves all transferred cycles to the canister
$update;
export function receiveCycles128(): nat {
    return ic.msgCyclesAccept128(ic.msgCyclesAvailable128() / 2n);
}
```
