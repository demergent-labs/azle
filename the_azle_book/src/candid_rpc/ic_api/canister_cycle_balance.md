# canisterCycleBalance

Get the canister's current cycle balance.

```typescript
import { canisterCycleBalance, IDL, query } from 'azle';

export default class {
    @query([], IDL.Nat)
    getBalance(): bigint {
        return canisterCycleBalance();
    }

    @query([], IDL.Bool)
    hasEnoughCycles(): boolean {
        const balance = canisterCycleBalance();
        const minimumRequired = 1_000_000_000n; // 1 billion cycles
        return balance >= minimumRequired;
    }
}
```

The `canisterCycleBalance` function returns the current number of cycles in the canister's balance. This is essential for monitoring canister resources and making decisions about operations that consume cycles.

**Returns:** Current cycle balance as `bigint`

**Use Cases:**

- Monitor canister resource usage
- Implement cycle-based access control
- Track cycle consumption patterns
- Trigger low-balance alerts or actions

**Important Notes:**

- Cycle balance decreases with computation and storage usage
- Balance can increase through cycle transfers from other canisters
- Monitor balance regularly to prevent canister freezing
