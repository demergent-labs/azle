# HTTP

This chapter is a work in progress.

## Incoming HTTP requests

Examples:

-   [http_counter](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/http_counter)

```typescript
import {
    blob,
    Func,
    nat16,
    Opt,
    $query,
    Query,
    Record,
    Tuple,
    Variant
} from 'azle';

type HttpRequest = Record<{
    method: string;
    url: string;
    headers: Header[];
    body: blob;
}>;

type HttpResponse = Record<{
    status_code: nat16;
    headers: Header[];
    body: blob;
    streaming_strategy: Opt<StreamingStrategy>;
    upgrade: Opt<boolean>;
}>;

type Header = Tuple<[string, string]>;

type StreamingStrategy = Variant<{
    Callback: CallbackStrategy;
}>;

type CallbackStrategy = Record<{
    callback: Callback;
    token: Token;
}>;

type Callback = Func<Query<(t: Token) => StreamingCallbackHttpResponse>>;

type StreamingCallbackHttpResponse = Record<{
    body: blob;
    token: Opt<Token>;
}>;

type Token = Record<{
    arbitrary_data: string;
}>;

$query;
export function http_request(req: HttpRequest): HttpResponse {
    return {
        status_code: 200,
        headers: [],
        body: Uint8Array.from([]),
        streaming_strategy: Opt.None,
        upgrade: Opt.Some(false)
    };
}
```

## Outgoing HTTP requests

Examples:

-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import {
    Alias,
    ic,
    $init,
    match,
    nat32,
    $query,
    StableBTreeMap,
    $update
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';
import decodeUtf8 from 'decode-utf8';
import encodeUtf8 from 'encode-utf8';

type JSON = Alias<string>;

let stableStorage = new StableBTreeMap<string, string>(0, 25, 1_000);

$init;
export function init(ethereumUrl: string): void {
    stableStorage.insert('ethereumUrl', ethereumUrl);
}

$update;
export async function ethGetBalance(ethereumAddress: string): Promise<JSON> {
    const maxResponseBytes = 200n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycleCostBase = 400_000_000n;
    const cycleCostPerByte = 300_000n; // TODO not sure on this exact cost
    const cycleCostTotal = cycleCostBase + cycleCostPerByte * maxResponseBytes;

    const httpResult = await managementCanister
        .http_request({
            url: stableStorage.get('ethereumUrl') ?? '',
            max_response_bytes: maxResponseBytes,
            method: {
                post: null
            },
            headers: [],
            body: new Uint8Array(
                encodeUtf8(
                    JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_getBalance',
                        params: [ethereumAddress, 'earliest'],
                        id: 1
                    })
                )
            ),
            transform: {
                function: [ic.id(), 'ethTransform'],
                context: Uint8Array.from([])
            }
        })
        .cycles(cycleCostTotal)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => decodeUtf8(Uint8Array.from(httpResponse.body)),
        Err: (err) => ic.trap(err ?? 'httpResult had an error')
    });
}

$update;
export async function ethGetBlockByNumber(number: nat32): Promise<JSON> {
    const maxResponseBytes = 2_000n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycleCostBase = 400_000_000n;
    const cycleCostPerByte = 300_000n; // TODO not sure on this exact cost
    const cycleCostTotal = cycleCostBase + cycleCostPerByte * maxResponseBytes;

    const httpResult = await managementCanister
        .http_request({
            url: stableStorage.get('ethereumUrl') ?? '',
            max_response_bytes: maxResponseBytes,
            method: {
                post: null
            },
            headers: [],
            body: new Uint8Array(
                encodeUtf8(
                    JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_getBlockByNumber',
                        params: [`0x${number.toString(16)}`, false],
                        id: 1
                    })
                )
            ),
            transform: {
                function: [ic.id(), 'ethTransform'],
                context: Uint8Array.from([])
            }
        })
        .cycles(cycleCostTotal)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => decodeUtf8(Uint8Array.from(httpResponse.body)),
        Err: (err) => ic.trap(err ?? 'httpResult had an error')
    });
}

$query;
export function ethTransform(args: HttpTransformArgs): HttpResponse {
    return {
        ...args.response,
        headers: []
    };
}
```
