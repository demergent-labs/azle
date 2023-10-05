# bitcoin_get_utxos

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

```typescript
import { Canister, ic, None, text, update } from 'azle';
import { GetUtxosResult, managementCanister } from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;

export default Canister({
    getUtxos: update([text], GetUtxosResult, async (address) => {
        return await ic.call(managementCanister.bitcoin_get_utxos, {
            args: [
                {
                    address,
                    filter: None,
                    network: { Regtest: null }
                }
            ],
            cycles: BITCOIN_API_CYCLE_COST
        });
    })
});
```
