# http_request

This section is a work in progress.

Examples:

-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import { ic, match, $query, $update } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

$update;
export async function xkcd(): Promise<HttpResponse> {
    const maxResponseBytes = 1_000n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycleCostBase = 400_000_000n;
    const cycleCostPerByte = 300_000n; // TODO not sure on this exact cost
    const cycleCostTotal = cycleCostBase + cycleCostPerByte * maxResponseBytes;

    const httpResult = await managementCanister
        .http_request({
            url: `https://xkcd.com/642/info.0.json`,
            max_response_bytes: maxResponseBytes,
            method: {
                get: null
            },
            headers: [],
            body: null,
            transform: {
                function: [ic.id(), 'xkcdTransform'],
                context: Uint8Array.from([])
            }
        })
        .cycles(cycleCostTotal)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => httpResponse,
        Err: (err) => ic.trap(err ?? 'httpResult had an error')
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
