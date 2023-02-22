# bitcoin_send_transaction

This section is a work in progress.

Examples:

```typescript
import { blob, $update, Variant } from 'azle';
import { BitcoinNetwork, management_canister } from 'azle/canisters/management';

const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

$update;
export async function send_transaction(transaction: blob): Promise<
    Variant<{
        ok: null;
        err: string;
    }>
> {
    const transaction_fee =
        BITCOIN_BASE_TRANSACTION_COST +
        BigInt(transaction.length) * BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

    const canister_result = await management_canister
        .bitcoin_send_transaction({
            transaction,
            network: BitcoinNetwork.Regtest
        })
        .cycles(transaction_fee)
        .call();

    return canister_result;
}
```
