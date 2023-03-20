# deposit_cycles

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { match, Principal, $update, Variant } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function executeDepositCycles(canisterId: Principal): Promise<
    Variant<{
        Ok: boolean;
        Err: string;
    }>
> {
    const canisterResult = await managementCanister
        .deposit_cycles({
            canister_id: canisterId
        })
        .cycles(1_000_000n)
        .call();

    return match(canisterResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}
```
