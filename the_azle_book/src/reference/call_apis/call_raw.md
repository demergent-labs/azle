# call raw

This section is a work in progress.

Examples:

-   [call_raw](https://github.com/demergent-labs/azle/tree/main/examples/call_raw)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import { ic, match, nat64, Principal, $update, Variant } from 'azle';

$update;
export async function executeCallRaw(
    canisterId: Principal,
    method: string,
    candidArgs: string,
    payment: nat64
): Promise<
    Variant<{
        Ok: string;
        Err: string;
    }>
> {
    const canisterResult = await ic.callRaw(
        canisterId,
        method,
        ic.candidEncode(candidArgs),
        payment
    );

    return match(canisterResult, {
        Ok: (ok) => ({
            Ok: ic.candidDecode(ok)
        }),
        Err: (err) => ({ Err: err })
    });
}
```
