# http_request

This section is a work in progress.

Examples:

-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import { ic, match, Opt, $query, $update } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

$update;
export async function xkcd(): Promise<HttpResponse> {
    const httpResult = await managementCanister
        .http_request({
            url: `https://xkcd.com/642/info.0.json`,
            max_response_bytes: Opt.Some(2_000n),
            method: {
                get: null
            },
            headers: [],
            body: Opt.None,
            transform: Opt.Some({
                function: [ic.id(), 'xkcdTransform'],
                context: Uint8Array.from([])
            })
        })
        .cycles(50_000_000n)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => httpResponse,
        Err: (err) => ic.trap(err)
    });
}

$query;
export function xkcdTransform(args: HttpTransformArgs): HttpResponse {
    return {
        ...args.response,
        headers: []
    };
}
```
