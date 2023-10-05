# ecdsa_public_key

This section is a work in progress.

Examples:

-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)

```typescript
import { blob, Canister, ic, None, Record, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

const PublicKey = Record({
    publicKey: blob
});

export default Canister({
    publicKey: update([], PublicKey, async () => {
        const caller = ic.caller().toUint8Array();

        const publicKeyResult = await ic.call(
            managementCanister.ecdsa_public_key,
            {
                args: [
                    {
                        canister_id: None,
                        derivation_path: [caller],
                        key_id: {
                            curve: { secp256k1: null },
                            name: 'dfx_test_key'
                        }
                    }
                ]
            }
        );

        return {
            publicKey: publicKeyResult.public_key
        };
    })
});
```
