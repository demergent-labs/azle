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

A cross-canister call begins with a definition of the canister to be called, referred to as an external canister.

Imagine a simple external canister called `token_canister`:

```typescript
import { ic, nat64, Principal, StableBTreeMap, $update } from 'azle';

let accounts = new StableBTreeMap<Principal, nat64>(0, 38, 15);

$update;
export function transfer(to: Principal, amount: nat64): nat64 {
    const from = ic.caller();

    const from_balance = accounts.get(from) ?? 0n;
    const to_balance = accounts.get(to) ?? 0n;

    accounts.insert(from, from_balance - amount);
    accounts.insert(to, to_balance + amount);

    return amount;
}
```

Here's how you would create its external canister definition:

```typescript
import {
    CanisterResult,
    ExternalCanister,
    Principal,
    nat64,
    update
} from 'azle';

class TokenCanister extends ExternalCanister {
    @update
    transfer: (to: Principal, amount: nat64) => CanisterResult<nat64>;
}
```

Once you have a canister definition you can instantiate it with the canister's `Principal` and then invoke its methods.

Here's how to instantiate `TokenCanister`:

```typescript
const token_canister = new TokenCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);
```

And here's a more complete example of a canister called `payout_canister` that performs a cross-canister call to `token_canister`:

```typescript
import {
    CanisterResult,
    ExternalCanister,
    nat64,
    Principal,
    $update,
    update,
    Variant
} from 'azle';

class TokenCanister extends ExternalCanister {
    @update
    transfer: (to: Principal, amount: nat64) => CanisterResult<nat64>;
}

const token_canister = new TokenCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

$update;
export async function payout(
    to: Principal,
    amount: nat64
): Promise<
    Variant<{
        ok: nat64;
        err: string;
    }>
> {
    return await token_canister.transfer(to, amount).call();
}
```

Notice that the `token_canister.transfer` method, because it is a cross-canister method, returns a `CanisterResult`. All cross-canister calls return `CanisterResult`, which has an `ok` or `err` property depending on if the cross-canister call was successful or not.

The IC guarantees that cross-canister calls will return. This means that, generally speaking, you will always receive a `CanisterResult`. Azle does not throw on cross-canister calls. Wrapping your cross-canister call in a `try...catch` most likely won't do anything useful.

Let's add to our example code and explore adding some practical result-based error-handling to stop people from stealing tokens.

`token_canister`:

```typescript
import { ic, nat64, Principal, StableBTreeMap, $update, Variant } from 'azle';

let accounts = new StableBTreeMap<Principal, nat64>(0, 38, 15);

$update;
export function transfer(
    to: Principal,
    amount: nat64
): Variant<{
    ok: nat64;
    err: Variant<{
        InsufficientBalance: nat64;
    }>;
}> {
    const from = ic.caller();

    const from_balance = accounts.get(from) ?? 0n;

    if (from_balance < amount) {
        return {
            err: {
                InsufficientBalance: from_balance
            }
        };
    }

    const to_balance = accounts.get(to) ?? 0n;

    accounts.insert(from, from_balance - amount);
    accounts.insert(to, to_balance + amount);

    return {
        ok: amount
    };
}
```

`payout_canister`:

```typescript
import {
    CanisterResult,
    ExternalCanister,
    nat64,
    ok,
    Principal,
    $update,
    update,
    Variant
} from 'azle';

class TokenCanister extends ExternalCanister {
    @update
    transfer: (
        to: Principal,
        amount: nat64
    ) => CanisterResult<
        Variant<{
            ok: nat64;
            err: Variant<{
                InsufficientBalance: nat64;
            }>;
        }>
    >;
}

const token_canister = new TokenCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

$update;
export async function payout(
    to: Principal,
    amount: nat64
): Promise<
    Variant<{
        ok: nat64;
        err: string;
    }>
> {
    const canister_result = await token_canister.transfer(to, amount).call();

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    const transfer_result = canister_result.ok;

    if (!ok(transfer_result)) {
        return {
            err: JSON.stringify(transfer_result.err)
        };
    }

    return {
        ok: transfer_result.ok
    };
}
```

Azle provides an `ok` function that will help you determine if a result is `ok` or not. This provides some benefits over using `in`, such as `if ('err' in result)` or `if ('ok' in result)`. There are other ways to check for the `ok` or `err` properties as well, feel free to experiment with the way that you prefer. They all have trade-offs.

So far we have only shown a cross-canister call from an update method. Update methods can call other update methods or query methods (but not composite query methods as discussed below). If an update method calls a query method, that query method will be called in replicated mode. Replicated mode engages the consensus process, but for queries the state will still be discarded.

Cross-canister calls can also be initiated from query methods (not yet live on IC mainnet but this works locally). These are known as composite queries, and in Azle they are simply `async` query methods. Composite queries can call other composite query methods and regular query methods. Composite queries cannot call update methods.

Here's an example of a composite query method:

```typescript
import {
    CanisterResult,
    ExternalCanister,
    Principal,
    $query,
    query,
    Variant
} from 'azle';

class SomeCanister extends ExternalCanister {
    @query
    query_for_boolean: () => CanisterResult<boolean>;
}

const some_canister = new SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

$query;
export async function query_some_canister(): Promise<
    Variant<{
        ok: boolean;
        err: string;
    }>
> {
    return await some_canister.query_for_boolean().call();
}
```

You can expect cross-canister calls within the same subnet to take up to a few seconds to complete, and cross-canister calls across subnets [take about double that time](https://forum.dfinity.org/t/can-i-run-multiple-inter-canister-update-calls-in-parallel/13115/6).

If you don't need to wait for your cross-canister call to return, you can use `notify`:

```typescript
import {
    CanisterResult,
    ExternalCanister,
    Principal,
    RejectionCode,
    $update,
    update,
    Variant
} from 'azle';

class SomeCanister extends ExternalCanister {
    @update
    receive_notification: () => CanisterResult<void>;
}

const some_canister = new SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

$update;
export function receive_notification(): Variant<{
    ok: null;
    err: RejectionCode;
}> {
    return some_canister.receive_notification().notify();
}
```

If you need to send cycles with your cross-canister call, you can call `cycles` before calling `call` or `notify`:

```typescript
import {
    CanisterResult,
    ExternalCanister,
    Principal,
    RejectionCode,
    $update,
    update,
    Variant
} from 'azle';

class SomeCanister extends ExternalCanister {
    @update
    receive_notification: () => CanisterResult<void>;
}

const some_canister = new SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

$update;
export function receive_notification(): Variant<{
    ok: null;
    err: RejectionCode;
}> {
    return some_canister.receive_notification().cycles(1_000_000n).notify();
}
```
