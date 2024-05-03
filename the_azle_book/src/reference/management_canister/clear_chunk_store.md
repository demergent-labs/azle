# clear_chunk_store

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { Canister, ic, update, Principal } from 'azle';
import { managementCanister } from 'azle/canisters/management';

export default Canister({
    executeClearChunkStore: update([Principal], bool, async (canisterId) => {
        await ic.call(managementCanister.clear_chunk_store, {
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
