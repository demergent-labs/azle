# call with payment

This section is a work in progress.

Examples:

-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)
-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)
-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)
-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)

```typescript
import { blob, Canister, ic, Principal, update, Void } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    executeInstallCode: update(
        [Principal, blob],
        Void,
        async (canisterId, wasmModule) => {
            return await ic.call(managementCanister.install_code, {
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
