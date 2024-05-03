# install_chunked_code

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { Vec, blob, bool, Canister, ic, Principal, update, None } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    executeInstallChunkedCode: update(
        [Principal, blob],
        bool,
        async (canisterId, wasmModuleHash) => {
            await ic.call(managementCanister.install_chunked_code, {
                args: [
                    {
                        mode: {
                            install: null
                        },
                        target_canister: canisterId,
                        store_canister: None,
                        chunk_hashes_list: [{ hash: wasmModuleHash }],
                        wasm_module_hash: wasmModuleHash,
                        arg: Uint8Array.from([]),
                        sender_canister_version: None
                    }
                ],
                cycles: 100_000_000_000n
            });

            return true;
        }
    )
});
```
