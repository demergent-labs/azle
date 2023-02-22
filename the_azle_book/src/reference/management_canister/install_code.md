# install_code

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { blob, ok, Principal, $update } from 'azle';
import { management_canister } from 'azle/canisters/management';

$update;
export async function execute_install_code(
    canister_id: Principal,
    wasm_module: blob
): Promise<
    Variant<{
        ok: boolean;
        err: string;
    }>
> {
    const canister_result = await management_canister
        .install_code({
            mode: {
                install: null
            },
            canister_id,
            wasm_module,
            arg: Uint8Array.from([])
        })
        .cycles(100_000_000_000n)
        .call();

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: true
    };
}
```
