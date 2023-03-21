# canister_status

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { $update, Variant } from 'azle';
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    managementCanister
} from 'azle/canisters/management';

$update;
export async function getCanisterStatus(args: CanisterStatusArgs): Promise<
    Variant<{
        Ok: CanisterStatusResult;
        Err: string;
    }>
> {
    const canisterStatusResultCanisterResult = await managementCanister
        .canister_status({
            canister_id: args.canister_id
        })
        .call();

    return match(canisterStatusResultCanisterResult, {
        Ok: (canisterStatusResult) => ({ Ok: canisterStatusResult }),
        Err: (err) => ({ Err: err })
    });
}
```
