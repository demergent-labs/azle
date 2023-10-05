# update_settings

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { bool, Canister, ic, None, Principal, Some, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    executeUpdateSettings: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.update_settings, {
            args: [
                {
                    canister_id: canisterId,
                    settings: {
                        controllers: None,
                        compute_allocation: Some(1n),
                        memory_allocation: Some(3_000_000n),
                        freezing_threshold: Some(2_000_000n)
                    }
                }
            ]
        });

        return true;
    })
});
```
