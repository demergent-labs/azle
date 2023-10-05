# sign_with_ecdsa

This section is a work in progress.

Examples:

-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)

```typescript
import { blob, Canister, ic, Record, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

const Signature = Record({
    signature: blob
});

export default Canister({
    sign: update([blob], Signature, async (messageHash) => {
        if (messageHash.length !== 32) {
            ic.trap('messageHash must be 32 bytes');
        }

        const caller = ic.caller().toUint8Array();

        const signatureResult = await ic.call(
            managementCanister.sign_with_ecdsa,
            {
                args: [
                    {
                        message_hash: messageHash,
                        derivation_path: [caller],
                        key_id: {
                            curve: { secp256k1: null },
                            name: 'dfx_test_key'
                        }
                    }
                ],
                cycles: 10_000_000_000n
            }
        );

        return {
            signature: signatureResult.signature
        };
    })
});
```
