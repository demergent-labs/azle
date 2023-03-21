# bitcoin_send_transaction

This section is a work in progress.

Examples:

```typescript
import { blob, $update, Variant } from 'azle';
import { BitcoinNetwork, managementCanister } from 'azle/canisters/management';

const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

$update;
export async function sendTransaction(transaction: blob): Promise<
    Variant<{
        Ok: null;
        Err: string;
    }>
> {
    const transactionFee =
        BITCOIN_BASE_TRANSACTION_COST +
        BigInt(transaction.length) * BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

    return await managementCanister
        .bitcoin_send_transaction({
            transaction,
            network: BitcoinNetwork.Regtest
        })
        .cycles(transactionFee)
        .call();
}
```
