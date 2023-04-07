# bitcoin_get_utxos

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

```typescript
import { Result, $update } from 'azle';
import {
    BitcoinNetwork,
    GetUtxosResult,
    managementCanister
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;

$update;
export async function getUtxos(
    address: string
): Promise<Result<GetUtxosResult, string>> {
    return await managementCanister
        .bitcoin_get_utxos({
            address,
            filter: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}
```
