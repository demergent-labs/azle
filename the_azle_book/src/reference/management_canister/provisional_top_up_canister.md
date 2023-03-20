# provisional_top_up_canister

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { match, nat, Principal, $update, Variant } from 'azle';
import { managementCanister } from 'azle/canisters/management';

$update;
export async function provisionalTopUpCanister(
    canisterId: Principal,
    amount: nat
): Promise<
    Variant<{
        Ok: boolean;
        Err: string;
    }>
> {
    const canisterResult = await managementCanister
        .provisional_top_up_canister({
            canister_id: canisterId,
            amount
        })
        .call();

    return match(canisterResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}
```
