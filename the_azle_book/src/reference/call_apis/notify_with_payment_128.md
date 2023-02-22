# notify with payment 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { ic, nat, $update, Variant } from 'azle';
import { cycles_canister } from '../cycles';

// Reports the number of cycles returned from the Cycles canister
$update;
export async function send_cycles128(): Promise<Variant<{
    ok: nat;
    err: string;
}>;> {
    const result = await cycles_canister
        .receive_cycles128()
        .cycles128(1_000_000n)
        .call();

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded128()
    };
}
```
