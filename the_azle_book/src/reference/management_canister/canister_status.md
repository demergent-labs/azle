# canister_status

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { $update, Variant } from 'azle';
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    management_canister
} from 'azle/canisters/management';

$update;
export async function get_canister_status(args: CanisterStatusArgs): Promise<
    Variant<{
        ok: CanisterStatusResult;
        err: string;
    }>
> {
    const canister_status_result_canister_result = await management_canister
        .canister_status({
            canister_id: args.canister_id
        })
        .call();

    if (canister_status_result_canister_result.ok === undefined) {
        return {
            err: canister_status_result_canister_result.err
        };
    }

    const canister_status_result = canister_status_result_canister_result.ok;

    return {
        ok: canister_status_result
    };
}
```
