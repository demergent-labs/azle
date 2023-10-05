# provisional_create_canister_with_cycles

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { Canister, ic, None, update } from 'azle';
import {
    managementCanister,
    ProvisionalCreateCanisterWithCyclesResult
} from 'azle/canisters/management';

export default Canister({
    provisionalCreateCanisterWithCycles: update(
        [],
        ProvisionalCreateCanisterWithCyclesResult,
        async () => {
            return await ic.call(
                managementCanister.provisional_create_canister_with_cycles,
                {
                    args: [
                        {
                            amount: None,
                            settings: None
                        }
                    ]
                }
            );
        }
    )
});
```
