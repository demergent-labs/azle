# deposit_cycles

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { match, Principal, Result, $update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function executeDepositCycles(
    canisterId: Principal
): Promise<Result<boolean, string>> {
    const callResult = await managementCanister
        .deposit_cycles({
            canister_id: canisterId
        })
        .cycles(1_000_000n)
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}
```
