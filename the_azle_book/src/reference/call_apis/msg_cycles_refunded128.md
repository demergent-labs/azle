# msg cycles refunded 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { ic, match, nat, Result, $update } from 'azle';
import { cyclesCanister } from '../cycles';

// Reports the number of cycles returned from the Cycles canister
$update;
export async function sendCycles128(): Promise<Result<nat, string>> {
    const result = await cyclesCanister
        .receiveCycles128()
        .cycles128(1_000_000n)
        .call();

    return match(result, {
        Ok: () => ({ Ok: ic.msgCyclesRefunded128() }),
        Err: (err) => ({ Err: err })
    });
}
```
