# upload_chunk

This section is a work in progress.

Examples:

-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)

```typescript
import { Canister, ic, update } from 'azle';
import {
    UploadChunkArgs,
    UploadChunkResult,
    managementCanister
} from 'azle/canisters/management';

export default Canister({
    executeUploadChunk: query(
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
