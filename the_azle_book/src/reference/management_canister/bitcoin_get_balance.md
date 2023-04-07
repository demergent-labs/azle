# bitcoin_get_balance

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

```typescript
import { Result, $update } from 'azle';
import {
    BitcoinNetwork,
    managementCanister,
    Satoshi
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;

$update;
export async function getBalance(
    address: string
): Promise<Result<Satoshi, string>> {
    return await managementCanister
        .bitcoin_get_balance({
            address,
            min_confirmations: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}
```
