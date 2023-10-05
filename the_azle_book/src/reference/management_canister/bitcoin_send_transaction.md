# bitcoin_send_transaction

This section is a work in progress.

Examples:

```typescript
import { blob, bool, Canister, ic, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

export default Canister({
    sendTransaction: update([blob], bool, async (transaction) => {
        const transactionFee =
            BITCOIN_BASE_TRANSACTION_COST +
            BigInt(transaction.length) *
                BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

        await ic.call(managementCanister.bitcoin_send_transaction, {
            args: [
                {
                    transaction,
                    network: { Regtest: null }
                }
            ],
            cycles: transactionFee
        });

        return true;
    })
});
```
