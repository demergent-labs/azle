# update_settings

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { match, Principal, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function executeUpdateSettings(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .update_settings({
            canister_id: canisterId,
            settings: {
                controllers: null,
                compute_allocation: 1n,
                memory_allocation: 3_000_000n,
                freezing_threshold: 2_000_000n
            }
        })
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}
```
