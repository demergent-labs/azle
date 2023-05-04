# Update Methods

## TLDR

-   Annotate functions with `$update`
-   Read-write
-   Executed on many nodes
-   Consensus
-   Latency ~2-5 seconds
-   20 billion Wasm instruction limit
-   4 GiB heap limit
-   48 GiB stable memory limit
-   ~900 updates per second per canister

Update methods are similar to query methods, but state changes can be persisted. Here's an example of a simple update method:

```typescript
import { nat64, $update } from 'azle';

let counter = 0n;

$update;
export function increment(): nat64 {
    return counter++;
}
```

Calling `increment` will return the current value of `counter` and then increase its value by 1. Because `counter` is a global variable, the change will be persisted to the heap, and subsequent query and update calls will have access to the new `counter` value.

Because the Internet Computer (IC) persists changes with certain fault tolerance guarantees, update calls are executed on many nodes and go through [consensus](https://internetcomputer.org/how-it-works/consensus/). This leads to latencies of ~2-5 seconds per update call.

Due to the latency and other expenses involved with update methods, it is best to use them only when necessary. Look at the following example:

```typescript
import { $query, $update } from 'azle';

let message = '';

$query;
export function getMessage(): string {
    return message;
}

$update;
export function setMessage(newMessage: string): void {
    message = newMessage;
}
```

You'll notice that we use an update method, `setMessage`, only to perform the change to the global `message` variable. We use `getMessage`, a query method, to read the message.

Keep in mind that the heap is limited to 4 GiB, and thus there is an upper bound to global variable storage capacity. You can imagine how a simple database like the following would eventually run out of memory with too many entries:

```typescript
import { Opt, $query, $update } from 'azle';

type Db = {
    [key: string]: string;
};

let db: Db = {};

$query;
export function get(key: string): Opt<string> {
    const value = db[key];
    return value !== undefined ? Opt.Some(value) : Opt.None;
}

$update;
export function set(key: string, value: string): void {
    db[key] = value;
}
```

If you need more than 4 GiB of storage, consider taking advantage of the 48 GiB of stable memory. Stable structures like `StableBTreeMap` give you a nice API for interacting with stable memory. These data structures will be [covered in more detail later](./stable_structures.md). Here's a simple example:

```typescript
import { Opt, $query, StableBTreeMap, $update } from 'azle';

let db = new StableBTreeMap<string, string>(0, 10, 10);

$query;
export function get(key: string): Opt<string> {
    return db.get(key);
}

$update;
export function set(key: string, value: string): void {
    db.insert(key, value);
}
```

So far we have only seen how state changes can be persisted. State changes can also be discarded by implicit or explicit traps. A trap is an immediate stop to execution with the ability to provide a message to the execution environment.

Traps can be useful for ensuring that multiple operations are either all completed or all disregarded, or in other words atomic. Keep in mind that these guarantees do not hold once cross-canister calls are introduced, but that's a more advanced topic [covered later](./cross_canister.md).

Here's an example of how to trap and ensure atomic changes to your database:

```typescript
import { Opt, $query, Record, StableBTreeMap, $update } from 'azle';

type Entry = Record<{
    key: string;
    value: string;
}>;

let db = new StableBTreeMap<string, string>(0, 10, 10);

$query;
export function get(key: string): Opt<string> {
    return db.get(key);
}

$update;
export function set(key: string, value: string): void {
    db.insert(key, value);
}

$update;
export function setMany(entries: Entry[]): void {
    entries.forEach((entry) => {
        db.insert(entry.key, entry.value);
    });
}
```

In addition to `ic.trap`, an explicit JavaScript `throw` or any unhandled exception will also trap.

There is a limit to how much computation can be done in a single call to an update method. The current update call limit is [20 billion Wasm instructions](https://internetcomputer.org/docs/current/developer-docs/production/instruction-limits). If we modify our database example, we can introduce an update method that runs the risk reaching the limit:

```typescript
import { nat64, Opt, $query, StableBTreeMap, $update } from 'azle';

let db = new StableBTreeMap<string, string>(0, 1_000, 1_000);

$query;
export function get(key: string): Opt<string> {
    return db.get(key);
}

$update;
export function set(key: string, value: string): void {
    db.insert(key, value);
}

$update;
export function setMany(numEntries: nat64): void {
    for (let i = 0; i < numEntries; i++) {
        db.insert(i.toString(), i.toString());
    }
}
```

From the `dfx command line` you can call `setMany` like this:

```bash
dfx canister call my_canister setMany '(100_000)'
```

With an argument of `100_000`, `setMany` will fail with an error `...exceeded the instruction limit for single message execution`.

In terms of update scalability, an individual canister [likely has an upper bound of ~900 updates per second](https://forum.dfinity.org/t/what-is-the-theroretical-number-for-txns-per-second-on-internet-computer-right-now/14039/6).
