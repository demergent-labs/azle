# msg cycles refunded

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { ic, match, nat64, Result, $update } from 'azle';
import { cyclesCanister } from '../cycles';

// Reports the number of cycles returned from the Cycles canister
$update;
export async function sendCycles(): Promise<Result<nat64, string>> {
    const result = await cyclesCanister
        .receiveCycles()
        .cycles(1_000_000n)
        .call();

    return match(result, {
        Ok: () => ({ Ok: ic.msgCyclesRefunded() }),
        Err: (err) => ({ Err: err })
    });
}
```
