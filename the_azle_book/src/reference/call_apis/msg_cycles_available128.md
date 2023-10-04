# msg cycles available 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { Canister, ic, nat64, update } from 'azle';

export default Canister({
    // Moves all transferred cycles to the canister
    receiveCycles128: update([], nat64, () => {
        return ic.msgCyclesAccept128(ic.msgCyclesAvailable128() / 2n);
    })
});
```
