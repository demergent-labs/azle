# call raw 128

This section is a work in progress.

Examples:

-   [call_raw](https://github.com/demergent-labs/azle/tree/main/examples/call_raw)

```typescript
import { ic, match, nat, Principal, $update, Variant } from 'azle';

$update;
export async function executeCallRaw128(
    canisterId: Principal,
    method: string,
    candidArgs: string,
    payment: nat
): Promise<
    Variant<{
        Ok: string;
        Err: string;
    }>
> {
    const callResult = await ic.callRaw128(
        canisterId,
        method,
        ic.candidEncode(candidArgs),
        payment
    );

    return match(callResult, {
        Ok: (ok) => ({
            Ok: ic.candidDecode(ok)
        }),
        Err: (err) => ({ Err: err })
    });
}
```
