# create_canister

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { Canister, ic, None, update } from 'azle';
import {
    CreateCanisterResult,
    managementCanister
} from 'azle/canisters/management';

export default Canister({
    executeCreateCanister: update([], CreateCanisterResult, async () => {
        return await ic.call(managementCanister.create_canister, {
            args: [{ settings: None }],
            cycles: 50_000_000_000_000n
        });
    })
});
```
