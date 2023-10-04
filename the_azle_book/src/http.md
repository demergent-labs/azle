# HTTP

This chapter is a work in progress.

## Incoming HTTP requests

Examples:

-   [http_counter](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/http_counter)

```typescript
import {
    blob,
    bool,
    Canister,
    Func,
    nat16,
    None,
    Opt,
    query,
    Record,
    text,
    Tuple,
    Variant,
    Vec
} from 'azle';

const Token = Record({
    // add whatever fields you'd like
    arbitrary_data: text
});

const StreamingCallbackHttpResponse = Record({
    body: blob,
    token: Opt(Token)
});

export const Callback = Func([text], StreamingCallbackHttpResponse, 'query');

const CallbackStrategy = Record({
    callback: Callback,
    token: Token
});

const StreamingStrategy = Variant({
    Callback: CallbackStrategy
});

type HeaderField = [text, text];
const HeaderField = Tuple(text, text);

const HttpResponse = Record({
    status_code: nat16,
    headers: Vec(HeaderField),
    body: blob,
    streaming_strategy: Opt(StreamingStrategy),
    upgrade: Opt(bool)
});

const HttpRequest = Record({
    method: text,
    url: text,
    headers: Vec(HeaderField),
    body: blob,
    certificate_version: Opt(nat16)
});

export default Canister({
    http_request: query([HttpRequest], HttpResponse, (req) => {
        return {
            status_code: 200,
            headers: [],
            body: Buffer.from('hello'),
            streaming_strategy: None,
            upgrade: None
        };
    })
});
```

## Outgoing HTTP requests

Examples:

-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

```typescript
import {
    Canister,
    ic,
    init,
    nat32,
    Principal,
    query,
    Some,
    StableBTreeMap,
    text,
    update
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

let stableStorage = StableBTreeMap(text, text, 0);

export default Canister({
    init: init([text], (ethereumUrl) => {
        stableStorage.insert('ethereumUrl', ethereumUrl);
    }),
    ethGetBalance: update([text], text, async (ethereumAddress) => {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        const httpResponse = await ic.call(managementCanister.http_request, {
            args: [
                {
                    url,
                    max_response_bytes: Some(2_000n),
                    method: {
                        post: null
                    },
                    headers: [],
                    body: Some(
                        Buffer.from(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBalance',
                                params: [ethereumAddress, 'earliest'],
                                id: 1
                            }),
                            'utf-8'
                        )
                    ),
                    transform: Some({
                        function: [ic.id(), 'ethTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }),
    ethGetBlockByNumber: update([nat32], text, async (number) => {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        const httpResponse = await ic.call(managementCanister.http_request, {
            args: [
                {
                    url,
                    max_response_bytes: Some(2_000n),
                    method: {
                        post: null
                    },
                    headers: [],
                    body: Some(
                        Buffer.from(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBlockByNumber',
                                params: [`0x${number.toString(16)}`, false],
                                id: 1
                            }),
                            'utf-8'
                        )
                    ),
                    transform: Some({
                        function: [ic.id(), 'ethTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }),
    ethTransform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});
```
