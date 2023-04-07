# Cross-canister

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

Canisters are generally able to call the query or update methods of other canisters in any subnet. We refer to these types of calls as cross-canister calls.

A cross-canister call begins with a definition of the canister to be called, referred to as a service.

Imagine a simple service called `token_canister`:

```typescript
import { ic, nat64, Principal, StableBTreeMap, $update } from 'azle';

let accounts = new StableBTreeMap<Principal, nat64>(0, 38, 15);

$update;
export function transfer(to: Principal, amount: nat64): nat64 {
    const from = ic.caller();

    const fromBalance = accounts.get(from) ?? 0n;
    const toBalance = accounts.get(to) ?? 0n;

    accounts.insert(from, fromBalance - amount);
    accounts.insert(to, toBalance + amount);

    return amount;
}
```

Here's how you would create its service definition:

```typescript
import { CallResult, Principal, nat64, Service, serviceUpdate } from 'azle';

class TokenCanister extends Service {
    @serviceUpdate
    transfer: (to: Principal, amount: nat64) => CallResult<nat64>;
}
```

Once you have a service definition you can instantiate it with the canister's `Principal` and then invoke its methods.

Here's how to instantiate `TokenCanister`:

```typescript
const tokenCanister = new TokenCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);
```

And here's a more complete example of a canister called `payout_canister` that performs a cross-canister call to `token_canister`:

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

Notice that the `token_canister.transfer` method, because it is a cross-canister method, returns a `CallResult`. All cross-canister calls return `CallResult`, which has an `Ok` or `Err` property depending on if the cross-canister call was successful or not.

The IC guarantees that cross-canister calls will return. This means that, generally speaking, you will always receive a `CallResult`. Azle does not throw on cross-canister calls. Wrapping your cross-canister call in a `try...catch` most likely won't do anything useful.

Let's add to our example code and explore adding some practical result-based error-handling to stop people from stealing tokens.

`token_canister`:

```typescript
import {
    ic,
    nat64,
    Principal,
    Result,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

let accounts = new StableBTreeMap<Principal, nat64>(0, 38, 15);

$update;
export function transfer(
    to: Principal,
    amount: nat64
): Variant<
    Result<
        nat64,
        Variant<{
            InsufficientBalance: nat64;
        }>
    >
> {
    const from = ic.caller();

    const fromBalance = accounts.get(from) ?? 0n;

    if (fromBalance < amount) {
        return {
            Err: {
                InsufficientBalance: fromBalance
            }
        };
    }

    const toBalance = accounts.get(to) ?? 0n;

    accounts.insert(from, fromBalance - amount);
    accounts.insert(to, toBalance + amount);

    return {
        Ok: amount
    };
}
```

`payout_canister`:

```typescript
import {
    CallResult,
    match,
    nat64,
    Principal,
    Result,
    Service,
    serviceUpdate,
    $update,
    Variant
} from 'azle';

class TokenCanister extends Service {
    @serviceUpdate
    transfer: (
        to: Principal,
        amount: nat64
    ) => CallResult<
        Result<
            nat64,
            Variant<{
                InsufficientBalance: nat64;
            }>
        >
    >;
}

const tokenCanister = new TokenCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

$update;
export async function payout(
    to: Principal,
    amount: nat64
): Promise<Result<nat64, string>> {
    const CallResult = await tokenCanister.transfer(to, amount).call();

    return match(CallResult, {
        Ok: (transferResult) =>
            match(transferResult, {
                Ok: (ok) => ({ Ok: ok }),
                Err: (err) => ({ Err: JSON.stringify(err) })
            }),
        Err: (err) => ({ Err: err })
    });
}
```

Azle provides a `match` function that will help you handle variant branches. This provides some benefits over using `in`, such as `if ('Err' in result)` or `if ('Ok' in result)`. There are other ways to check for the `Ok` or `Err` properties as well, feel free to experiment with the way that you prefer. They all have trade-offs.

So far we have only shown a cross-canister call from an update method. Update methods can call other update methods or query methods (but not composite query methods as discussed below). If an update method calls a query method, that query method will be called in replicated mode. Replicated mode engages the consensus process, but for queries the state will still be discarded.

Cross-canister calls can also be initiated from query methods (not yet live on IC mainnet but this works locally). These are known as composite queries, and in Azle they are simply `async` query methods. Composite queries can call other composite query methods and regular query methods. Composite queries cannot call update methods.

Here's an example of a composite query method:

```typescript
import {
    CallResult,
    Principal,
    $query,
    Result,
    Service,
    serviceQuery
} from 'azle';

class SomeCanister extends Service {
    @serviceQuery
    queryForBoolean: () => CallResult<boolean>;
}

const someCanister = new SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

$query;
export async function querySomeCanister(): Promise<Result<boolean, string>> {
    return await someCanister.queryForBoolean().call();
}
```

You can expect cross-canister calls within the same subnet to take up to a few seconds to complete, and cross-canister calls across subnets [take about double that time](https://forum.dfinity.org/t/can-i-run-multiple-inter-canister-update-calls-in-parallel/13115/6).

If you don't need to wait for your cross-canister call to return, you can use `notify`:

```typescript
import {
    CallResult,
    Principal,
    RejectionCode,
    Result,
    Service,
    serviceUpdate,
    $update
} from 'azle';

class SomeCanister extends Service {
    @serviceUpdate
    receiveNotification: () => CallResult<void>;
}

const someCanister = new SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

$update;
export function sendNotification(): Result<null, RejectionCode> {
    return someCanister.receiveNotification().notify();
}
```

If you need to send cycles with your cross-canister call, you can call `cycles` before calling `call` or `notify`:

```typescript
import {
    CallResult,
    Principal,
    RejectionCode,
    Result,
    Service,
    serviceUpdate,
    $update
} from 'azle';

class SomeCanister extends Service {
    @serviceUpdate
    receiveNotification: () => CallResult<void>;
}

const someCanister = new SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

$update;
export function sendNotification(): Result<null, RejectionCode> {
    return someCanister.receiveNotification().cycles(1_000_000n).notify();
}
```
