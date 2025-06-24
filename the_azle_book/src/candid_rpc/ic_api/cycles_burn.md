# cyclesBurn

Permanently destroy cycles from the canister's balance.

```typescript
import { cyclesBurn, canisterCycleBalance, IDL, update } from 'azle';

export default class {
    @update(
        [IDL.Nat],
        IDL.Record({
            burned: IDL.Nat,
            remaining: IDL.Nat
        })
    )
    burnCycles(amount: bigint): { burned: bigint; remaining: bigint } {
        const balanceBefore = canisterCycleBalance();

        if (amount > balanceBefore) {
            throw new Error('Cannot burn more cycles than available');
        }

        cyclesBurn(amount);

        return {
            burned: amount,
            remaining: canisterCycleBalance()
        };
    }
}
```

The `cyclesBurn` function permanently destroys the specified number of cycles from the canister's balance. The burned cycles are removed from circulation.

**Parameters:**

- `amount`: Number of cycles to burn (`bigint`)

**Returns:** `void`

**Use Cases:**

- Implement deflationary tokenomics
- Reduce cycle supply for economic reasons
- Clean up excess cycles
- Fee burning mechanisms

**Important Notes:**

- Cycles are permanently destroyed and cannot be recovered
- Cannot burn more cycles than the canister's current balance
- Use with caution as this reduces available resources
