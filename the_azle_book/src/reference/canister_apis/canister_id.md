# canister id

This section is a work in progress.

Examples:

-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [ic_api](https://github.com/demergent-labs/azle/tree/main/examples/ic_api)
-   [http_counter](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/http_counter)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)
-   [whoami](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/whoami)

```typescript
import { Canister, ic, Principal, query } from 'azle';

export default Canister({
    // returns this canister's id
    id: query([], Principal, () => {
        return ic.id();
    })
});
```
