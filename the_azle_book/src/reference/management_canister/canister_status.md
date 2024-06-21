# canister_status

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { Canister, ic, update } from 'azle/experimental';
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    managementCanister
} from 'azle/canisters/management';

export default Canister({
    getCanisterStatus: update(
        [CanisterStatusArgs],
        CanisterStatusResult,
        async (args) => {
            return await ic.call(managementCanister.canister_status, {
                args: [args]
            });
        }
    )
});
```
