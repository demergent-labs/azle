# msg cycles refunded

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { Canister, ic, nat64, update } from 'azle';
import { otherCanister } from './other_canister';

export default Canister({
    // Reports the number of cycles returned from the Cycles canister
    sendCycles: update([], nat64, async () => {
        await ic.call(otherCanister.receiveCycles, {
            cycles: 1_000_000n
        });

        return ic.msgCyclesRefunded();
    })
});
```
