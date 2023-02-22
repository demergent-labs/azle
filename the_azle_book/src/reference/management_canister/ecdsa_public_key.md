# ecdsa_public_key

This section is a work in progress.

Examples:

-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)

```typescript
import { blob, ic, ok, Record, $update, Variant } from 'azle';
import { management_canister } from 'azle/canisters/management';

$update;
export async function public_key(): Promise<
    Variant<{
        ok: Record<{ public_key: blob }>;
        err: string;
    }>
> {
    const caller = ic.caller().toUint8Array();
    const public_key_result = await management_canister
        .ecdsa_public_key({
            canister_id: null,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        })
        .call();

    if (!ok(public_key_result)) {
        return { err: public_key_result.err };
    }

    return { ok: { public_key: public_key_result.ok.public_key } };
}
```
