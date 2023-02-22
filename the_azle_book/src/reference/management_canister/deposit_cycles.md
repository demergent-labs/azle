# deposit_cycles

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { ok, Principal, $update, Variant } from 'azle';
import { management_canister } from 'azle/canisters/management';

$update;
export async function execute_deposit_cycles(canister_id: Principal): Promise<
    Variant<{
        ok: boolean;
        err: string;
    }>
> {
    const canister_result = await management_canister
        .deposit_cycles({
            canister_id
        })
        .cycles(1_000_000n)
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
