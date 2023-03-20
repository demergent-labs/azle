# install_code

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { blob, match, Principal, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function executeInstallCode(
    canisterId: Principal,
    wasmModule: blob
): Promise<
    Variant<{
        Ok: boolean;
        Err: string;
    }>
> {
    const canisterResult = await managementCanister
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

    return match(canisterResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}
```
