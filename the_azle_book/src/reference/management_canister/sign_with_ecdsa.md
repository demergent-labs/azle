# sign_with_ecdsa

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { blob, ic, match, Record, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function sign(
    messageHash: blob
): Promise<Result<Record<{ signature: blob }>, string>> {
    if (messageHash.length !== 32) {
        ic.trap('messageHash must be 32 bytes');
    }

    const caller = ic.caller().toUint8Array();

    const signatureResult = await managementCanister
        .sign_with_ecdsa({
            message_hash: messageHash,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfxTestKey' }
        })
        .cycles(10_000_000_000n)
        .call();

    return match(signatureResult, {
        Ok: (signWithEcdsaResult) => ({
            Ok: {
                signature: signWithEcdsaResult.signature
            }
        }),
        Err: (err) => ({ Err: err })
    });
}
```
