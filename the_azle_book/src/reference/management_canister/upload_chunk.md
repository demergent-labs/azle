# upload_chunk

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { blob, Canister, ic, Principal, update } from 'azle';
import {
    managementCanister,
    UploadChunkResult
} from 'azle/canisters/management';

export default Canister({
    executeUploadChunk: update(
        [Principal, blob],
        UploadChunkResult,
        async (canisterId, wasmChunk) => {
            return await ic.call(managementCanister.upload_chunk, {
                args: [
                    {
                        canister_id: canisterId,
                        chunk: wasmChunk
                    }
                ]
            });
        }
    )
});
```
