# install_code

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { blob, match, Principal, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

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
