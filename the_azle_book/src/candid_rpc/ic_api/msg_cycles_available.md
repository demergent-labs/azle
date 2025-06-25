# msgCyclesAvailable

Get the number of cycles available in the current call.

```typescript
import { msgCyclesAvailable, msgCyclesAccept, IDL, update } from 'azle';

export default class {
    @update(
        [],
        IDL.Record({
            available: IDL.Nat,
            accepted: IDL.Nat
        })
    )
    processPayment(): { available: bigint; accepted: bigint } {
        const available = msgCyclesAvailable();

        if (available < 1_000_000n) {
            throw new Error('Insufficient payment');
        }

        const accepted = msgCyclesAccept(available);

        return { available, accepted };
    }
}
```

The `msgCyclesAvailable` function returns the number of cycles that were sent along with the current method call and are available to be accepted.

**Returns:** Number of cycles available to accept (`bigint`)

**Use Cases:**

- Check payment amount before processing
- Implement minimum payment requirements
- Calculate partial acceptance amounts
- Log payment information

**Important Notes:**

- Available cycles decrease as `msgCyclesAccept` is called
- Unaccepted cycles are automatically refunded
- Returns 0 if no cycles were sent with the call
