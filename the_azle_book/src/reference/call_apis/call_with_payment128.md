# call with payment 128

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
import { blob, Canister, ic, Principal, update, Void } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    executeInstallCode: update(
        [Principal, blob],
        Void,
        async (canisterId, wasmModule) => {
            return await ic.call128(managementCanister.install_code, {
                args: [
                    {
                        mode: { install: null },
                        canister_id: canisterId,
                        wasm_module: wasmModule,
                        arg: Uint8Array.from([])
                    }
                ],
                cycles: 100_000_000_000n
            });
        }
    )
});
```
