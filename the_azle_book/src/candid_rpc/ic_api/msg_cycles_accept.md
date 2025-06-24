# msgCyclesAccept

Accept cycles sent with the current call.

```typescript
import { msgCyclesAccept, msgCyclesAvailable, IDL, update } from 'azle';

export default class {
    @update([], IDL.Nat)
    acceptPayment(): bigint {
        const available = msgCyclesAvailable();
        const accepted = msgCyclesAccept(available);
        return accepted;
    }

    @update([], IDL.Nat)
    acceptPartialPayment(): bigint {
        const available = msgCyclesAvailable();
        const toAccept = available / 2n; // Accept half
        return msgCyclesAccept(toAccept);
    }
}
```

The `msgCyclesAccept` function accepts cycles that were sent along with the current method call. Any cycles not accepted are automatically refunded to the caller.

**Parameters:**

- `maxAmount`: Maximum number of cycles to accept (`bigint`)

**Returns:** Actual number of cycles accepted (`bigint`)

**Important Notes:**

- Must be called from an `@update` method (not `@query`)
- Cycles not accepted are refunded to the caller
- Cannot accept more cycles than were sent
- Accepted cycles are added to the canister's balance
