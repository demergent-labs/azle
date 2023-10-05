# http_request

This section is a work in progress.

Examples:

-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import { Canister, ic, None, Principal, query, Some, update } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

export default Canister({
    xkcd: update([], HttpResponse, async () => {
        return await ic.call(managementCanister.http_request, {
            args: [
                {
                    url: `https://xkcd.com/642/info.0.json`,
                    max_response_bytes: Some(2_000n),
                    method: {
                        get: null
                    },
                    headers: [],
                    body: None,
                    transform: Some({
                        function: [ic.id(), 'xkcdTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });
    }),
    xkcdTransform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});
```
