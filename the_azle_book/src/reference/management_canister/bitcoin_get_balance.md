# bitcoin_get_balance

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

```typescript
import { $update, Variant } from 'azle';
import {
    BitcoinNetwork,
    management_canister,
    Satoshi
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;

$update;
export async function get_balance(address: string): Promise<
    Variant<{
        ok: Satoshi;
        err: string;
    }>
> {
    const canister_result = await management_canister
        .bitcoin_get_balance({
            address,
            min_confirmations: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();

    return canister_result;
}
```
