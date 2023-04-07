# call

This section is a work in progress.

Examples:

-   [async_await](https://github.com/demergent-labs/azle/tree/main/examples/async_await)
-   [bitcoin](https://github.com/demergent-labs/azle/tree/main/examples/bitcoin)
-   [composite_queries](https://github.com/demergent-labs/azle/tree/main/examples/composite_queries)
-   [cross_canister_calls](https://github.com/demergent-labs/azle/tree/main/examples/cross_canister_calls)
-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)
-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [func_types](https://github.com/demergent-labs/azle/tree/main/examples/func_types)
-   [heartbeat](https://github.com/demergent-labs/azle/tree/main/examples/heartbeat)
-   [inline_types](https://github.com/demergent-labs/azle/tree/main/examples/inline_types)
-   [ledger_canister](https://github.com/demergent-labs/azle/tree/main/examples/ledger_canister)
-   [management_canister](https://github.com/demergent-labs/azle/tree/main/examples/management_canister)
-   [outgoing_http_requests](https://github.com/demergent-labs/azle/tree/main/examples/outgoing_http_requests)
-   [threshold_ecdsa](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/threshold_ecdsa)
-   [rejections](https://github.com/demergent-labs/azle/tree/main/examples/rejections)
-   [timers](https://github.com/demergent-labs/azle/tree/main/examples/timers)
-   [tuple_types](https://github.com/demergent-labs/azle/tree/main/examples/tuple_types)
-   [whoami](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/whoami)

```typescript
import {
    CallResult,
    nat64,
    Principal,
    Result,
    Service,
    serviceUpdate,
    $update
} from 'azle';

class TokenCanister extends Service {
    @serviceUpdate
    transfer: (to: Principal, amount: nat64) => CallResult<nat64>;
}

const tokenCanister = new TokenCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

$update;
export async function payout(
    to: Principal,
    amount: nat64
): Promise<Result<nat64, string>> {
    return await tokenCanister.transfer(to, amount).call();
}
```
