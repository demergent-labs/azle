# ecdsa_public_key

This section is a work in progress.

Examples:

-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)

```typescript
import { blob, ic, match, Record, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function publicKey(): Promise<
    Result<Record<{ publicKey: blob }>, string>
> {
    const caller = ic.caller().toUint8Array();
    const publicKeyResult = await managementCanister
        .ecdsa_public_key({
            canister_id: null,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfxTestKey' }
        })
        .call();

    return match(publicKeyResult, {
        Ok: (ecdsaPublicKeyResult) => ({
            Ok: {
                publicKey: ecdsaPublicKeyResult.public_key
            }
        }),
        Err: (err) => ({ Err: err })
    });
}
```
