# candid decode

This section is a work in progress.

Examples:

-   [call_raw](https://github.com/demergent-labs/azle/tree/main/examples/call_raw)
-   [candid_encoding](https://github.com/demergent-labs/azle/tree/main/examples/candid_encoding)

```typescript
import { blob, Canister, ic, query, text } from 'azle';

export default Canister({
    // decodes Candid bytes to a Candid string
    candidDecode: query([blob], text, (candidEncoded) => {
        return ic.candidDecode(candidEncoded);
    })
});
```
