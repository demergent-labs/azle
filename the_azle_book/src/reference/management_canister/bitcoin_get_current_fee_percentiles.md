# bitcoin_get_current_fee_percentiles

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

```typescript
import { $update, Variant } from 'azle';
import {
    BitcoinNetwork,
    managementCanister,
    MillisatoshiPerByte
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;

$update;
export async function getCurrentFeePercentiles(): Promise<
    Variant<{
        Ok: MillisatoshiPerByte[];
        Err: string;
    }>
> {
    return await managementCanister
        .bitcoin_get_current_fee_percentiles({
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}
```
