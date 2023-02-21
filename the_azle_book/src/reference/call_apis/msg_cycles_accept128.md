# msg cycles accept 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { ic, nat, $update } from 'azle';

// Moves all transferred cycles to the canister
$update;
export function receive_cycles128(): nat {
    return ic.msg_cycles_accept128(ic.msg_cycles_available128() / 2n);
}
```
