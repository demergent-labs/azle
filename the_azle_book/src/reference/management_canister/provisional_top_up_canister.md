# provisional_top_up_canister

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { bool, Canister, ic, nat, Principal, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    provisionalTopUpCanister: update(
        [Principal, nat],
        bool,
        async (canisterId, amount) => {
            await ic.call(managementCanister.provisional_top_up_canister, {
                args: [
                    {
                        canister_id: canisterId,
                        amount
                    }
                ]
            });

            return true;
        }
    )
});
```
