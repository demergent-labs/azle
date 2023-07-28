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
    Variant,
    Vec
} from 'azle';

type HttpRequest = Record<{
    method: string;
    url: string;
    headers: Vec<Header>;
    body: blob;
}>;

type HttpResponse = Record<{
    status_code: nat16;
    headers: Vec<Header>;
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
    ic,
    $init,
    match,
    nat32,
    $query,
    StableBTreeMap,
    $update,
    Opt
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';
import decodeUtf8 from 'decode-utf8';
import encodeUtf8 from 'encode-utf8';

type JSON = string;

let stableStorage = new StableBTreeMap<string, string>(0, 25, 1_000);

$init;
export function init(ethereumUrl: string): void {
    stableStorage.insert('ethereumUrl', ethereumUrl);
}

$update;
export async function ethGetBalance(ethereumAddress: string): Promise<JSON> {
    const httpResult = await managementCanister
        .http_request({
            url: match(stableStorage.get('ethereumUrl'), {
                Some: (url) => url,
                None: () => ''
            }),
            max_response_bytes: Opt.Some(2_000n),
            method: {
                post: null
            },
            headers: [],
            body: Opt.Some(
                new Uint8Array(
                    encodeUtf8(
                        JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_getBalance',
                            params: [ethereumAddress, 'earliest'],
                            id: 1
                        })
                    )
                )
            ),
            transform: Opt.Some({
                function: [ic.id(), 'ethTransform'],
                context: Uint8Array.from([])
            })
        })
        .cycles(50_000_000n)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => decodeUtf8(Uint8Array.from(httpResponse.body)),
        Err: (err) => ic.trap(err)
    });
}

$update;
export async function ethGetBlockByNumber(number: nat32): Promise<JSON> {
    const httpResult = await managementCanister
        .http_request({
            url: match(stableStorage.get('ethereumUrl'), {
                Some: (url) => url,
                None: () => ''
            }),
            max_response_bytes: Opt.Some(2_000n),
            method: {
                post: null
            },
            headers: [],
            body: Opt.Some(
                new Uint8Array(
                    encodeUtf8(
                        JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_getBlockByNumber',
                            params: [`0x${number.toString(16)}`, false],
                            id: 1
                        })
                    )
                )
            ),
            transform: Opt.Some({
                function: [ic.id(), 'ethTransform'],
                context: Uint8Array.from([])
            })
        })
        .cycles(50_000_000n)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => decodeUtf8(Uint8Array.from(httpResponse.body)),
        Err: (err) => ic.trap(err)
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
