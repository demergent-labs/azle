# uninstall_code

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { bool, Canister, ic, Principal, update } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    executeUninstallCode: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.uninstall_code, {
            args: [
                {
                    canister_id: canisterId
                }
            ]
        });

        return true;
    })
});
```
