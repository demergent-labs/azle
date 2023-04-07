# canister_status

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { match, Result, $update } from 'azle';
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    managementCanister
} from 'azle/canisters/management';

$update;
export async function getCanisterStatus(
    args: CanisterStatusArgs
): Promise<Result<CanisterStatusResult, string>> {
    const canisterStatusResultCallResult = await managementCanister
        .canister_status({
            canister_id: args.canister_id
        })
        .call();

    return match(canisterStatusResultCallResult, {
        Ok: (canisterStatusResult) => ({ Ok: canisterStatusResult }),
        Err: (err) => ({ Err: err })
    });
}
```
