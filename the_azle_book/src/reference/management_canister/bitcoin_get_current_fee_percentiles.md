# bitcoin_get_current_fee_percentiles

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

```typescript
import { $update, Variant } from 'azle';
import {
    BitcoinNetwork,
    management_canister,
    MillisatoshiPerByte
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;

$update;
export async function get_current_fee_percentiles(): Promise<
    Variant<{
        ok: MillisatoshiPerByte[];
        err: string;
    }>
> {
    const canister_result = await management_canister
        .bitcoin_get_current_fee_percentiles({
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();

    return canister_result;
}
```
