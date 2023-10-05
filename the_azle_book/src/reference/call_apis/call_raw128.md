# call raw 128

This section is a work in progress.

Examples:

-   [call_raw](https://github.com/demergent-labs/azle/tree/main/examples/call_raw)

```typescript
import { Canister, ic, nat, Principal, text, update } from 'azle';

export default Canister({
    executeCallRaw128: update(
        [Principal, text, text, nat],
        text,
        async (canisterId, method, candidArgs, payment) => {
            const candidBytes = await ic.callRaw128(
                canisterId,
                method,
                ic.candidEncode(candidArgs),
                payment
            );

            return ic.candidDecode(candidBytes);
        }
    )
});
```
