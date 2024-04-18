# fetch TL;DR

Azle canisters use a custom `fetch` implementation to perform cross-canister calls and to perform HTTPS outcalls.

Here's an example of performing a cross-canister call:

```typescript
import { serialize } from 'azle';
import express from 'express';

const app = express();

app.use(express.json());

app.post('/cross-canister-call', async (req, res) => {
    const to: string = req.body.to;
    const amount: number = req.body.amount;

    const response = await fetch(`icp://dfdal-2uaaa-aaaaa-qaama-cai/transfer`, {
        body: serialize({
            candidPath: '/token.did',
            args: [to, amount]
        })
    });
    const responseJson = await response.json();

    res.json(responseJson);
});

app.listen();
```

Keep these important points in mind when performing a cross-canister call:

-   Use the `icp://` protocol in the URL
-   The `canister id` of the canister that you are calling immediately follows `icp://` in the URL
-   The `canister method` that you are calling immediately follows the `canister id` in the URL
-   The `candidPath` property of the `body` is the path to the Candid file defining the method signatures of the canister that you are calling. You must obtain this file and copy it into your canister. See the [Assets chapter](./assets.md) for info on copying files into your canister
-   The `args` property of the `body` is an array of the arguments that will be passed to the `canister method` that you are calling

Here's an example of performing an HTTPS outcall:

```typescript
import express from 'express';

const app = express();

app.use(express.json());

app.post('/https-outcall', async (_req, res) => {
    const response = await fetch(`https://httpbin.org/headers`, {
        headers: {
            'X-Azle-Request-Key-0': 'X-Azle-Request-Value-0',
            'X-Azle-Request-Key-1': 'X-Azle-Request-Value-1',
            'X-Azle-Request-Key-2': 'X-Azle-Request-Value-2'
        }
    });
    const responseJson = await response.json();

    res.json(responseJson);
});

app.listen();
```

# fetch

Azle has custom `fetch` implementations for clients and canisters.

The client `fetch` is used for authentication, and you can learn more about it in the [Authentication chapter](./authentication.md).

Canister `fetch` is used to perform cross-canister calls and [HTTPS outcalls](https://internetcomputer.org/https-outcalls). There are three main types of calls made with canister `fetch`:

1. [Cross-canister calls to a candid canister](#cross-canister-calls-to-a-candid-canister)
2. [Cross-canister calls to an HTTP canister](#cross-canister-calls-to-an-http-canister)
3. [HTTPS outcalls](#https-outcalls)

## Cross-canister calls to a candid canister

Examples:

-   [async_await](https://github.com/demergent-labs/azle/tree/main/examples/async_await)
-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)
-   [canister](https://github.com/demergent-labs/azle/tree/main/examples/canister)
-   [ckbtc](https://github.com/demergent-labs/azle/tree/main/examples/ckbtc)
-   [composite_queries](https://github.com/demergent-labs/azle/tree/main/examples/composite_queries)
-   [cross_canister_calls](https://github.com/demergent-labs/azle/tree/main/examples/cross_canister_calls)
-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)
-   [func_types](https://github.com/demergent-labs/azle/tree/main/examples/func_types)
-   [heartbeat](https://github.com/demergent-labs/azle/tree/main/examples/heartbeat)
-   [ic_evm_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ic_evm_rpc)
-   [icrc](https://github.com/demergent-labs/azle/tree/main/examples/icrc)
-   [ledger_canister](https://github.com/demergent-labs/azle/tree/main/examples/ledger_canister)
-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)
-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)
-   [whoami](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/whoami)
-   [recursion](https://github.com/demergent-labs/azle/tree/main/examples/recursion)
-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)
-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)

## Cross-canister calls to an HTTP canister

We are working on better abstractions for these types of calls. For now you would just make a cross-canister call using `icp://` to the `http_request` and `http_request_update` methods of the canister that you are calling.

## HTTPS outcalls

Examples:

-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [http_outcall_fetch](https://github.com/demergent-labs/azle/tree/main/examples/http_outcall_fetch)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)

<!-- // TODO explain that you can generally only do these in POST unless the method is a query method
// TODO we have to show the imports
// TODO explain the POST, PUT, PATCH etc

TODO explain the ic.setOutgoingHttpOptions

TODO split up the examples for each type of fetch

## Canister fetch cross-canister call to a candid canister

Most canisters on ICP are not HTTP canisters. We are pushing to change this situation, but for now this is how things are. Most canisters will thus only expose Candid canister methods.

So imagine a canister that exposes this Candid update method:

```
transfer: (text, text, nat64) -> (nat64);
```

```typescript
const response = await fetch(`icp://dfdal-2uaaa-aaaaa-qaama-cai/transfer`, {
    body: serialize({
        candidPath: '/src/canister2/index.did',
        args: [from, to, amount]
    })
});
const responseJson = await response.json();

return responseJson;
```

## Canister fetch cross-canister call to an HTTP canister

## Canister fetch HTTPS outcalls -->
