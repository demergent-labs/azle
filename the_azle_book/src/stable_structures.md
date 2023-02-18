# Stable Structures

## TLDR

-   48 GiB of stable memory
-   Familiar native language data structure API
-   max key size
-   max value size
-   memory id
-   no current way to upgrade/migrate a deployed memory id

TODO let's show how to make an actually useful database
TODO start with a simple user, and then build up all of the CRUD around it
TODO maybe we should use something besides a user though, since that is a common example
TODO maybe a blog post, or maybe a podcast app or something

Stable structures are data structures with familiar APIs that allow access to stable memory. Stable memory is a separate memory location from the heap that currently allows up to 48 GiB of storage. Stable memory also persists automatically across upgrades.

It's important to understand that when a canister is upgraded (see the canister lifecycle later, basically you can initialize, upgrade, and uninstall a canister TODO look into the exact lifecycle and explain it simply here) its heap is wiped. That means that all data you have stored on the heap, such as global variables, will be erased. But anything stored in stable memory will be preserved. Writing and readin to and from stable memory can be done with a low-level byte API, but it is much easier to use stable structures.

Azle currently provides one stable structure called `StableBTreeMap`. It's essentially a map like you would find in JavaScript, similar to `Map` or just an object. You can `insert`, `read`, `remove` etc. You don't have to do anything when upgrading your canister, the `StableBTreeMap` will automatically retain its data.

This is currently the recommended way to store your data because of its persistence across upgrades and its large storage capacity.

It's important to note that you cannot recover a memory id once allocated to a `StableBTreeMap`. This is a current limitation and will be removed later. So keep in mind, once a `StableBTreeMap` is created with a certain memory id, you should not change it. You can remove items to reduce the memory consumption of that `StableBTreeMap`, but you cannot reuse the memory id for another `StableBTreeMap` and you cannot change the type of the `StableBTreeMap` associated with that memory location.

See this issue for migration information: https://github.com/demergent-labs/azle/issues/843

TODO explain how to whittle your way down to the correct number of bytes
TODO if each principal is 38 bytes then 100,000 would give you about 2630 recordings

## Definition

Here's how to define a simple `StableBTreeMap`:

```typescript
import { nat8, StableBTreeMap } from 'azle';

let map = new StableBTreeMap<nat8, string>(0, 1_000, 1_000);
```

This is a `StableBTreeMap` with a key of type `string` and a value of type `nat64`.

## memory id

## max key size

TODO show how to experiment with the size

## max value size

TODO show how to experiment with the size

## show all operations

Here's a basic example of how to do all of the operations:

```typescript
import {
    InsertError,
    nat64,
    nat8,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type Key = nat8;
type Value = string;

type InsertResult = Variant<{
    ok: Opt<Value>;
    err: InsertError;
}>;

let map = new StableBTreeMap<Key, Value>(0, 100, 100);

$query;
export function contains_key(key: Key): boolean {
    return map.contains_key(key);
}

$query;
export function get(key: Key): Opt<Value> {
    return map.get(key);
}

$update;
export function insert(key: Key, value: Value): InsertResult {
    return map.insert(key, value);
}

$query;
export function is_empty(): boolean {
    return map.is_empty();
}

$query;
export function items(): [Key, Value][] {
    return map.items();
}

$query;
export function keys(): Key[] {
    return map.keys();
}

$query;
export function len(): nat64 {
    return map.len();
}

$update;
export function remove(key: Key): Opt<Value> {
    return map.remove(key);
}

$query;
export function values(): Value[] {
    return map.values();
}
```

TODO also build a simple database with all CRUD operations
