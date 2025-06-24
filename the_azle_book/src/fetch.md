# fetch TL;DR

Azle canisters use a custom `fetch` implementation to perform cross-canister calls and to perform HTTPS outcalls.

Here's an example of performing a cross-canister call:

```typescript
import { serialize } from 'azle/experimental';
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

- Use the `icp://` protocol in the URL
- The `canister id` of the canister that you are calling immediately follows `icp://` in the URL
- The `canister method` that you are calling immediately follows the `canister id` in the URL
- The `candidPath` property of the `body` is the path to the Candid file defining the method signatures of the canister that you are calling. You must obtain this file and copy it into your canister. See the [Assets chapter](./assets.md) for info on copying files into your canister
- The `args` property of the `body` is an array of the arguments that will be passed to the `canister method` that you are calling

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

Canister `fetch` is used to perform cross-canister calls and <a href="https://internetcomputer.org/https-outcalls" target="_blank">HTTPS outcalls</a>. There are three main types of calls made with canister `fetch`:

1. [Cross-canister calls to a candid canister](#cross-canister-calls-to-a-candid-canister)
2. [Cross-canister calls to an HTTP canister](#cross-canister-calls-to-an-http-canister)
3. [HTTPS outcalls](#https-outcalls)

## Cross-canister calls to a candid canister

Examples:

- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/async_await" target="_blank">async_await</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/bitcoin" target="_blank">bitcoin</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/canister" target="_blank">canister</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/ckbtc" target="_blank">ckbtc</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/composite_queries" target="_blank">composite_queries</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/cross_canister_calls" target="_blank">cross_canister_calls</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/cycles" target="_blank">cycles</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/func_types" target="_blank">func_types</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/heartbeat" target="_blank">heartbeat</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/http_server/ic_evm_rpc" target="_blank">ic_evm_rpc</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/icrc" target="_blank">icrc</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/ledger_canister" target="_blank">ledger_canister</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/management_canister" target="_blank">management_canister</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/motoko_examples/threshold_ecdsa" target="_blank">threshold_ecdsa</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/motoko_examples/whoami" target="_blank">whoami</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/recursion" target="_blank">recursion</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/rejections" target="_blank">rejections</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/timers" target="_blank">timers</a>

## Cross-canister calls to an HTTP canister

We are working on better abstractions for these types of calls. For now you would just make a cross-canister call using `icp://` to the `http_request` and `http_request_update` methods of the canister that you are calling.

## HTTPS outcalls

Examples:

- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/ethereum_json_rpc" target="_blank">ethereum_json_rpc</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/http_server/http_outcall_fetch" target="_blank">http_outcall_fetch</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/functional_syntax/outgoing_http_requests" target="_blank">outgoing_http_requests</a>

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
