# call raw

This section is a work in progress.

Examples:

-   [call_raw](https://github.com/demergent-labs/azle/tree/main/examples/call_raw)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import { Canister, ic, nat64, Principal, text, update } from 'azle';

export default Canister({
    executeCallRaw: update(
        [Principal, text, text, nat64],
        text,
        async (canisterId, method, candidArgs, payment) => {
            const candidBytes = await ic.callRaw(
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
