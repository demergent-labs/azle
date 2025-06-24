# msgCyclesRefunded

Get the number of cycles refunded from the last inter-canister call.

```typescript
import { call, msgCyclesRefunded, IDL, update, Principal } from 'azle';

export default class {
    @update(
        [IDL.Principal],
        IDL.Record({
            sent: IDL.Nat,
            refunded: IDL.Nat
        })
    )
    async transferCycles(
        recipient: Principal
    ): Promise<{ sent: bigint; refunded: bigint }> {
        const cyclesToSend = 1_000_000n;

        await call(recipient, 'receive_cycles', {
            cycles: cyclesToSend
        });

        const refunded = msgCyclesRefunded();

        return {
            sent: cyclesToSend,
            refunded
        };
    }
}
```

The `msgCyclesRefunded` function returns the number of cycles that were refunded from the most recent inter-canister call made by the current method.

**Returns:** Number of cycles refunded from the last call (`bigint`)

**Use Cases:**

- Track actual cycle costs of inter-canister calls
- Implement cycle accounting and monitoring
- Adjust future calls based on refund patterns
- Debug cycle transfer issues

**Important Notes:**

- Only reflects refunds from the most recent call
- Returns 0 if no cycles were refunded
- Must be called after an inter-canister call completes
