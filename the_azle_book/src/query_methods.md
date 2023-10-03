# Query Methods

## TLDR

-   Created with the `query` function
-   Read-only
-   Executed on a single node
-   No consensus
-   Latency on the order of ~100 milliseconds
-   [5 billion Wasm instruction limit](https://internetcomputer.org/docs/current/developer-docs/production/instruction-limits)
-   4 GiB heap limit
-   [~32k queries per second per canister](https://forum.dfinity.org/t/what-is-the-theroretical-number-for-txns-per-second-on-internet-computer-right-now/14039/6)

The most basic way to expose your canister's functionality publicly is through a query method. Here's an example of a simple query method named `getString`:

```typescript
import { Canister, query, text } from 'azle';

export default Canister({
    getString: query([], text, () => {
        return 'This is a query method!';
    })
});
```

Query methods are defined inside of a call to `Canister` using the `query` function.

The first parameter to `query` is an array of `CandidType` objects that will be used to decode the Candid bytes of the arguments sent from the client when calling your query method.

The second parameter to `query` is a `CandidType` object used to encode the return value of your function to Candid bytes to then be sent back to the client.

The third parameter to `query` is the function that receives the decoded arguments, performs some computation, and then returns a value to be encoded. The TypeScript signature of this function (parameter and return types) will be inferred from the `CandidType` arguments in the first and second parameters to `query`.

`getString` can be called from the outside world through the IC's HTTP API. You'll usually invoke this API from the [`dfx command line`, `dfx web UI`, or an agent](./deployment.md#interacting-with-your-canister).

From the `dfx command line` you can call it like this:

```bash
dfx canister call my_canister getString
```

Query methods are read-only. They do not persist any state changes. Take a look at the following example:

```typescript
import { Canister, query, text, Void } from 'azle';

let db: {
    [key: string]: string;
} = {};

export default Canister({
    set: query([text, text], Void, (key, value) => {
        db[key] = value;
    })
});
```

Calling `set` will perform the operation of setting the `key` property on the `db` object to `value`, but after the call finishes that change will be discarded.

This is because query methods are executed on a single node machine and do not go through [consensus](https://internetcomputer.org/how-it-works/consensus/). This results in lower latencies, perhaps on the order of 100 milliseconds.

There is a limit to how much computation can be done in a single call to a query method. The current query call limit is [5 billion Wasm instructions](https://internetcomputer.org/docs/current/developer-docs/production/instruction-limits). Here's an example of a query method that runs the risk of reaching the limit:

```typescript
import { Canister, nat32, query, text } from 'azle';

export default Canister({
    pyramid: query([nat32], text, (levels) => {
        return new Array(levels).fill(0).reduce((acc, _, index) => {
            const asterisks = new Array(index + 1).fill('*').join('');
            return `${acc}${asterisks}\n`;
        }, '');
    })
});
```

From the `dfx command line` you can call `pyramid` like this:

```bash
dfx canister call my_canister pyramid '(1_000)'
```

With an argument of `1_000`, `pyramid` will fail with an error `...exceeded the instruction limit for single message execution`.

Keep in mind that each query method invocation has up to 4 GiB of heap available.

In terms of query scalability, an individual canister [likely has an upper bound of ~36k queries per second](https://forum.dfinity.org/t/what-is-the-theroretical-number-for-txns-per-second-on-internet-computer-right-now/14039/6).
