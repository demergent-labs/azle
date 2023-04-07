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
import { blob, Principal, Result, $update } from 'azle';
import { management_canister } from 'azle/canisters/management';

$update;
export async function executeInstallCode(
    canisterId: Principal,
    wasmModule: blob
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .install_code({
            mode: {
                install: null
            },
            canister_id: canisterId,
            wasm_module: wasmModule,
            arg: Uint8Array.from([])
        })
        .cycles(100_000_000_000n)
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}
```
