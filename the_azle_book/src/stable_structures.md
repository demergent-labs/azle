# Stable Structures

## TLDR

-   48 GiB of stable memory
-   Persistent across upgrades
-   Familiar API
-   Must specify memory id
-   Must specify maximum key size
-   Must specify maximum value size
-   No migrations per memory id

Stable structures are data structures with familiar APIs that allow access to stable memory. Stable memory is a separate memory location from the heap that currently allows up to 48 GiB of storage. Stable memory persists automatically across upgrades.

Persistence on the Internet Computer (IC) is very important to understand. When a canister is upgraded (its code is changed after being initially deployed) its heap is wiped. This includes all global variables.

On the other hand, anything stored in stable memory will be preserved. Writing and reading to and from stable memory can be done with a [low-level API](./reference/stable_memory/stable_memory.md), but it is generally easier and preferable to use stable structures.

Azle currently provides one stable structure called `StableBTreeMap`. It's similar to a [JavaScript Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and has most of the common operations you'd expect such as reading, inserting, and removing values.

Here's how to define a simple `StableBTreeMap`. Each `StableBTreeMap` must be defined in the global scope (not within any functions or objects etc):

```typescript
import { nat8, StableBTreeMap } from 'azle';

let map = new StableBTreeMap<nat8, string>(0, 100, 1_000);
```

This is a `StableBTreeMap` with a key of type `nat8` and a value of type `string`. Key and value types can be any [Candid type](candid.md).

This `StableBTreeMap` also has a `memory id` of `0`, a maximum key size of `100` bytes and a maximum value size of `1_000` bytes. You must statically specify the `memory id`, maximum key size, and maximum value sizes (they cannot be variables).

Each `StableBTreeMap` instance must have a unique `memory id`. Once a `memory id` is allocated, it cannot be used with a different `StableBTreeMap`. This means you can't create another `StableBTreeMap` using the same `memory id`, and you can't change the key or value types of an existing `StableBTreeMap`. [This problem will be addressed](https://github.com/demergent-labs/azle/issues/843).

Here's an example showing all of the basic `StableBTreeMap` operations:

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

let map = new StableBTreeMap<Key, Value>(0, 100, 1_000);

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

With these basic operations you can build more complex CRUD database applications:

```typescript
import {
    blob,
    ic,
    InsertError,
    nat64,
    ok,
    Opt,
    Principal,
    $query,
    Record,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type User = Record<{
    id: Principal;
    created_at: nat64;
    recording_ids: Principal[];
    username: string;
}>;

type Recording = Record<{
    id: Principal;
    audio: blob;
    created_at: nat64;
    name: string;
    user_id: Principal;
}>;

let users = new StableBTreeMap<Principal, User>(0, 38, 100_000);
let recordings = new StableBTreeMap<Principal, Recording>(1, 38, 5_000_000);

$update;
export function create_user(username: string): Variant<{
    ok: User;
    err: InsertError;
}> {
    const id = generate_id();
    const user: User = {
        id,
        created_at: ic.time(),
        recording_ids: [],
        username
    };

    const result = users.insert(user.id, user);

    if (!ok(result)) {
        return {
            err: result.err
        };
    }

    return {
        ok: user
    };
}

$query;
export function read_users(): User[] {
    return users.values();
}

$query;
export function read_user_by_id(id: Principal): Opt<User> {
    return users.get(id);
}

$update;
export function delete_user(id: Principal): Variant<{
    ok: User;
    err: Variant<{
        UserDoesNotExist: Principal;
    }>;
}> {
    const user = users.get(id);

    if (user === null) {
        return {
            err: {
                UserDoesNotExist: id
            }
        };
    }

    user.recording_ids.forEach((recording_id) => {
        recordings.remove(recording_id);
    });

    users.remove(user.id);

    return {
        ok: user
    };
}

$update;
export function create_recording(
    audio: blob,
    name: string,
    user_id: Principal
): Variant<{
    ok: Recording;
    err: Variant<{
        InsertError: InsertError;
        UserDoesNotExist: Principal;
    }>;
}> {
    const user = users.get(user_id);

    if (user === null) {
        return {
            err: {
                UserDoesNotExist: user_id
            }
        };
    }

    const id = generate_id();
    const recording: Recording = {
        id,
        audio,
        created_at: ic.time(),
        name,
        user_id
    };

    const create_recording_result = recordings.insert(recording.id, recording);

    if (!ok(create_recording_result)) {
        return {
            err: {
                InsertError: create_recording_result.err
            }
        };
    }

    const updated_user: User = {
        ...user,
        recording_ids: [...user.recording_ids, recording.id]
    };

    const update_user_result = users.insert(updated_user.id, updated_user);

    if (!ok(update_user_result)) {
        return {
            err: {
                InsertError: update_user_result.err
            }
        };
    }

    return {
        ok: recording
    };
}

$query;
export function read_recordings(): Recording[] {
    return recordings.values();
}

$query;
export function read_recording_by_id(id: Principal): Opt<Recording> {
    return recordings.get(id);
}

$update;
export function delete_recording(id: Principal): Variant<{
    ok: Recording;
    err: Variant<{
        InsertError: InsertError;
        RecordingDoesNotExist: Principal;
        UserDoesNotExist: Principal;
    }>;
}> {
    const recording = recordings.get(id);

    if (recording === null) {
        return {
            err: {
                RecordingDoesNotExist: id
            }
        };
    }

    const user = users.get(recording.user_id);

    if (user === null) {
        return {
            err: {
                UserDoesNotExist: recording.user_id
            }
        };
    }

    const updated_user: User = {
        ...user,
        recording_ids: user.recording_ids.filter(
            (recording_id) => recording_id.toText() !== recording.id.toText()
        )
    };

    const update_user_result = users.insert(updated_user.id, updated_user);

    if (!ok(update_user_result)) {
        return {
            err: {
                InsertError: update_user_result.err
            }
        };
    }

    recordings.remove(id);

    return {
        ok: recording
    };
}

function generate_id(): Principal {
    const random_bytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(random_bytes));
}
```

The example above shows a very basic audio recording backend application. There are two types of entities that need to be stored, `User` and `Recording`. These are represented as `Candid` records.

Each entity gets its own `StableBTreeMap`:

```typescript
import { blob, nat64, Principal, Record, StableBTreeMap } from 'azle';

type User = Record<{
    id: Principal;
    created_at: nat64;
    recording_ids: Principal[];
    username: string;
}>;

type Recording = Record<{
    id: Principal;
    audio: blob;
    created_at: nat64;
    name: string;
    user_id: Principal;
}>;

let users = new StableBTreeMap<Principal, User>(0, 38, 100_000);
let recordings = new StableBTreeMap<Principal, Recording>(1, 38, 5_000_000);
```

Notice that each `StableBTreeMap` has a unique `memory id`. The maximum key and value sizes are also set according to the expected application usage.

You can figure out the appropriate maximum key and value sizes by reasoning about your application and engaging in some trial and error using the `insert` method. Calling `insert` on a `StableBTreeMap` returns an `InsertResult` variant that looks like this:

```typescript
type InsertResult<T> = Variant<{
    ok: T;
    err: InsertError;
}>;

type InsertError = Variant<{
    KeyTooLarge: KeyTooLarge;
    ValueTooLarge: ValueTooLarge;
}>;

type KeyTooLarge = Record<{
    given: nat32;
    max: nat32;
}>;

type ValueTooLarge = Record<{
    given: nat32;
    max: nat32;
}>;
```

The `InsertError` variant will in some cases have the information that you need to determine the maximum key or value size. If you attempt to insert a key or value that is too large, the `KeyTooLarge` and `ValueTooLarge` records will show you the size of the value that you attempted to insert. You can increase the maximum key or value size based on the information you receive from the `KeyTooLarge` and `ValueTooLarge` records and try inserting again.

Thus through some trial and error you can whittle your way to a correct solution. In some cases all of your values will have an obvious static maximum size. In the audio recording example, trial and error revealed that `Principal` is most likely always 38 bytes, thus the maximum key size is set to 38.

Maximum value sizes can be more tricky to figure out, especially if the values are records or variants with dynamic fields such as arrays. `User` has one such dynamic field, `recording_ids`. Since each recording id is a Principal, we know that each will take up 38 bytes. The other fields on `User` shouldn't take up too many bytes so we'll ignore them for our analysis.

We've set the maximum value size of `User` to be 100_000 bytes. If we divide 100_00 by 38, we get ~2_631. This will result in each user being able to store around that many recordings. That's acceptable for our example, and so we'll go with it.

As for `Recording`, the largest dynamic field is `audio`, which will be the actual bytes of the audio recording. We've set the maximum value size here to 5_000_000, which should allow for recordings of ~5 MB in size. That seems reasonable for our example, and so we'll go with it.

As you can see, finding the correct maximum key and value sizes is a bit of an art right now. Combining some trial and error with reasoning about your specific application should get you a working solution in most cases. It's our hope that the need to specify maximum key and value sizes will be removed in the future.
