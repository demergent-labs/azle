# candid encode

This section is a work in progress.

Examples:

-   [call_raw](https://github.com/demergent-labs/azle/tree/main/examples/call_raw)
-   [candid_encoding](https://github.com/demergent-labs/azle/tree/main/examples/candid_encoding)
-   [manual_reply](https://github.com/demergent-labs/azle/tree/main/examples/manual_reply)
-   [notify_raw](https://github.com/demergent-labs/azle/tree/main/examples/notify_raw)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import { blob, Canister, ic, query, text } from 'azle';

export default Canister({
    // encodes a Candid string to Candid bytes
    candidEncode: query([text], blob, (candidString) => {
        return ic.candidEncode(candidString);
    })
});
```
