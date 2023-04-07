# stop_canister

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { match, Principal, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function executeStopCanister(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .stop_canister({
            canister_id: canisterId
        })
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}
```
