# sign_with_ecdsa

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { blob, ic, ok, Record, $update, Variant } from 'azle';
import { management_canister } from 'azle/canisters/management';

$update;
export async function sign(message_hash: blob): Promise<
    Variant<{
        ok: Record<{ signature: blob }>;
        err: string;
    }>
> {
    if (message_hash.length !== 32) {
        ic.trap('message_hash must be 32 bytes');
    }

    const caller = ic.caller().toUint8Array();

    const signature_result = await management_canister
        .sign_with_ecdsa({
            message_hash,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        })
        .cycles(10_000_000_000n)
        .call();

    if (!ok(signature_result)) {
        return { err: signature_result.err };
    }

    return { ok: { signature: signature_result.ok.signature } };
}
```
