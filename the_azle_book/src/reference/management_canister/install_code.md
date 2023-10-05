# install_code

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { blob, bool, Canister, ic, Principal, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    executeInstallCode: update(
        [Principal, blob],
        bool,
        async (canisterId, wasmModule) => {
            await ic.call(managementCanister.install_code, {
                args: [
                    {
                        mode: {
                            install: null
                        },
                        canister_id: canisterId,
                        wasm_module: wasmModule,
                        arg: Uint8Array.from([])
                    }
                ],
                cycles: 100_000_000_000n
            });

            return true;
        }
    )
});
```
