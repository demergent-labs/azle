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

A cross-canister call begins with a definition of the canister to be called.

Imagine a simple canister called `token_canister`:

```typescript
import {
    Canister,
    ic,
    nat64,
    Opt,
    Principal,
    StableBTreeMap,
    update
} from 'azle';

let accounts = StableBTreeMap(Principal, nat64, 0);

export default Canister({
    transfer: update([Principal, nat64], nat64, (to, amount) => {
        const from = ic.caller();

        const fromBalance = getBalance(accounts.get(from));
        const toBalance = getBalance(accounts.get(to));

        accounts.insert(from, fromBalance - amount);
        accounts.insert(to, toBalance + amount);

        return amount;
    })
});

function getBalance(accountOpt: Opt<nat64>): nat64 {
    if ('None' in accountOpt) {
        return 0n;
    } else {
        return accountOpt.Some;
    }
}
```

Now that you have the canister definition, you can import and instantiate it in another canister:

```typescript
import { Canister, ic, nat64, Principal, update } from 'azle';
import TokenCanister from './token_canister';

const tokenCanister = TokenCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

export default Canister({
    payout: update([Principal, nat64], nat64, async (to, amount) => {
        return await ic.call(tokenCanister.transfer, {
            args: [to, amount]
        });
    })
});
```

If you don't have the actual definition of the token canister with the canister method implementations, you can always create your own canister definition without method implementations:

```typescript
import { Canister, ic, nat64, Principal, update } from 'azle';

const TokenCanister = Canister({
    transfer: update([Principal, nat64], nat64)
});

const tokenCanister = TokenCanister(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

export default Canister({
    payout: update([Principal, nat64], nat64, async (to, amount) => {
        return await ic.call(tokenCanister.transfer, {
            args: [to, amount]
        });
    })
});
```

The IC guarantees that cross-canister calls will return. This means that, generally speaking, you will always receive a response from `ic.call`. If there are errors during the call, `ic.call` will throw. Wrapping your cross-canister call in a `try...catch` allows you to handle these errors.

Let's add to our example code and explore adding some practical error-handling to stop people from stealing tokens.

`token_canister`:

```typescript
import {
    Canister,
    ic,
    nat64,
    Opt,
    Principal,
    StableBTreeMap,
    update
} from 'azle';

let accounts = StableBTreeMap(Principal, nat64, 0);

export default Canister({
    transfer: update([Principal, nat64], nat64, (to, amount) => {
        const from = ic.caller();

        const fromBalance = getBalance(accounts.get(from));

        if (amount > fromBalance) {
            throw new Error(`${from} has an insufficient balance`);
        }

        const toBalance = getBalance(accounts.get(to));

        accounts.insert(from, fromBalance - amount);
        accounts.insert(to, toBalance + amount);

        return amount;
    })
});

function getBalance(accountOpt: Opt<nat64>): nat64 {
    if ('None' in accountOpt) {
        return 0n;
    } else {
        return accountOpt.Some;
    }
}
```

`payout_canister`:

```typescript
import { Canister, ic, nat64, Principal, update } from 'azle';
import TokenCanister from './index';

const tokenCanister = TokenCanister(
    Principal.fromText('bkyz2-fmaaa-aaaaa-qaaaq-cai')
);

export default Canister({
    payout: update([Principal, nat64], nat64, async (to, amount) => {
        try {
            return await ic.call(tokenCanister.transfer, {
                args: [to, amount]
            });
        } catch (error) {
            console.log(error);
        }

        return 0n;
    })
});
```

Throwing will allow you to express error conditions and halt execution, but you may find embracing the `Result` variant as a better solution for error handling because of its composability and predictability.

So far we have only shown a cross-canister call from an update method. Update methods can call other update methods or query methods (but not composite query methods as discussed below). If an update method calls a query method, that query method will be called in replicated mode. Replicated mode engages the consensus process, but for queries the state will still be discarded.

Cross-canister calls can also be initiated from query methods. These are known as composite queries, and in Azle they are simply `async` query methods. Composite queries can call other composite query methods and regular query methods. Composite queries cannot call update methods.

Here's an example of a composite query method:

```typescript
import { bool, Canister, ic, Principal, query } from 'azle';

const SomeCanister = Canister({
    queryForBoolean: query([], bool)
});

const someCanister = SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

export default Canister({
    querySomeCanister: query([], bool, async () => {
        return await ic.call(someCanister.queryForBoolean);
    })
});
```

You can expect cross-canister calls within the same subnet to take up to a few seconds to complete, and cross-canister calls across subnets [take about double that time](https://forum.dfinity.org/t/can-i-run-multiple-inter-canister-update-calls-in-parallel/13115/6). Composite queries should be much faster, similar to query calls in latency.

If you don't need to wait for your cross-canister call to return, you can use `notify`:

```typescript
import { Canister, ic, Principal, update, Void } from 'azle';

const SomeCanister = Canister({
    receiveNotification: update([], Void)
});

const someCanister = SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

export default Canister({
    sendNotification: update([], Void, () => {
        return ic.notify(someCanister.receiveNotification);
    })
});
```

If you need to send cycles with your cross-canister call, you can add `cycles` to the `config` object of `ic.notify`:

```typescript
import { Canister, ic, Principal, update, Void } from 'azle';

const SomeCanister = Canister({
    receiveNotification: update([], Void)
});

const someCanister = SomeCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

export default Canister({
    sendNotification: update([], Void, () => {
        return ic.notify(someCanister.receiveNotification, {
            cycles: 1_000_000n
        });
    })
});
```
