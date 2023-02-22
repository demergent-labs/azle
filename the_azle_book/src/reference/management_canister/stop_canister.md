# stop_canister

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { ok, Principal, $update, Variant } from 'azle';
import { management_canister } from 'azle/canisters/management';

$update;
export async function execute_stop_canister(canister_id: Principal): Promise<
    Variant<{
        ok: boolean;
        err: string;
    }>
> {
    const canister_result = await management_canister
        .stop_canister({
            canister_id
        })
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
