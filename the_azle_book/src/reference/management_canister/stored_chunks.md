# stored_chunks

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { Canister, ic, update } from 'azle';
import {
    StoredChunksArgs,
    StoredChunksResult,
    managementCanister
} from 'azle/canisters/management';

export default Canister({
    getStoredChunks: query(
        [Principal],
        StoredChunksResult,
        async (canisterId) => {
            return await ic.call(managementCanister.stored_chunks, {
                args: [
                    {
                        canister_id: canisterId
                    }
                ]
            });
        }
    )
});
```
