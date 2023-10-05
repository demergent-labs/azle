# bitcoin_get_balance

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

```typescript
import { Canister, ic, None, text, update } from 'azle';
import { managementCanister, Satoshi } from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;

export default Canister({
    getBalance: update([text], Satoshi, async (address) => {
        return await ic.call(managementCanister.bitcoin_get_balance, {
            args: [
                {
                    address,
                    min_confirmations: None,
                    network: { Regtest: null }
                }
            ],
            cycles: BITCOIN_API_CYCLE_COST
        });
    })
});
```
