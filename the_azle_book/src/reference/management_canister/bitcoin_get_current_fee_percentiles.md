# bitcoin_get_current_fee_percentiles

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)

```typescript
import { Canister, ic, update, Vec } from 'azle';
import {
    managementCanister,
    MillisatoshiPerByte
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;

export default Canister({
    getCurrentFeePercentiles: update([], Vec(MillisatoshiPerByte), async () => {
        return await ic.call(
            managementCanister.bitcoin_get_current_fee_percentiles,
            {
                args: [
                    {
                        network: { Regtest: null }
                    }
                ],
                cycles: BITCOIN_API_CYCLE_COST
            }
        );
    })
});
```
