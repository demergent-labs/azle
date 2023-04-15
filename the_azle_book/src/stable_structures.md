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
    Alias,
    nat64,
    nat8,
    Opt,
    $query,
    Result,
    StableBTreeMap,
    $update
} from 'azle';

type Key = nat8;
type Value = string;

let map = new StableBTreeMap<Key, Value>(0, 100, 1_000);

$query;
export function containsKey(key: Key): boolean {
    return map.containsKey(key);
}

$query;
export function get(key: Key): Opt<Value> {
    return map.get(key);
}

$update;
export function insert(key: Key, value: Value): Opt<Value> {
    return map.insert(key, value);
}

$query;
export function isEmpty(): boolean {
    return map.isEmpty();
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
    nat64,
    Opt,
    Principal,
    $query,
    Record,
    Result,
    StableBTreeMap,
    $update,
    Variant,
    Vec
} from 'azle';

type User = Record<{
    id: Principal;
    createdAt: nat64;
    recordingIds: Vec<Principal>;
    username: string;
}>;

type Recording = Record<{
    id: Principal;
    audio: blob;
    createdAt: nat64;
    name: string;
    userId: Principal;
}>;

let users = new StableBTreeMap<Principal, User>(0, 38, 100_000);
let recordings = new StableBTreeMap<Principal, Recording>(1, 38, 5_000_000);

$update;
export function createUser(username: string): User {
    const id = generateId();
    const user: User = {
        id,
        createdAt: ic.time(),
        recordingIds: [],
        username
    };

    users.insert(user.id, user);

    return user;
}

$query;
export function readUsers(): Vec<User> {
    return users.values();
}

$query;
export function readUserById(id: Principal): Opt<User> {
    return users.get(id);
}

$update;
export function deleteUser(id: Principal): Result<
    User,
    Variant<{
        UserDoesNotExist: Principal;
    }>
> {
    const user = users.get(id);

    if (user === null) {
        return {
            Err: {
                UserDoesNotExist: id
            }
        };
    }

    user.recordingIds.forEach((recordingId) => {
        recordings.remove(recordingId);
    });

    users.remove(user.id);

    return {
        Ok: user
    };
}

$update;
export function createRecording(
    audio: blob,
    name: string,
    userId: Principal
): Result<
    Recording,
    Variant<{
        UserDoesNotExist: Principal;
    }>
> {
    const user = users.get(userId);

    if (user === null) {
        return {
            Err: {
                UserDoesNotExist: userId
            }
        };
    }

    const id = generateId();
    const recording: Recording = {
        id,
        audio,
        createdAt: ic.time(),
        name,
        userId
    };

    recordings.insert(recording.id, recording);

    const updatedUser: User = {
        ...user,
        recordingIds: [...user.recordingIds, recording.id]
    };

    users.insert(updatedUser.id, updatedUser);

    return {
        Ok: recording
    };
}

$query;
export function readRecordings(): Vec<Recording> {
    return recordings.values();
}

$query;
export function readRecordingById(id: Principal): Opt<Recording> {
    return recordings.get(id);
}

$update;
export function deleteRecording(id: Principal): Result<
    Recording,
    Variant<{
        RecordingDoesNotExist: Principal;
        UserDoesNotExist: Principal;
    }>
> {
    const recording = recordings.get(id);

    if (recording === null) {
        return {
            Err: {
                RecordingDoesNotExist: id
            }
        };
    }

    const user = users.get(recording.userId);

    if (user === null) {
        return {
            Err: {
                UserDoesNotExist: recording.userId
            }
        };
    }

    const updatedUser: User = {
        ...user,
        recordingIds: user.recordingIds.filter(
            (recordingId) => recordingId.toText() !== recording.id.toText()
        )
    };

    users.insert(updatedUser.id, updatedUser);

    recordings.remove(id);

    return {
        Ok: recording
    };
}

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
```

The example above shows a very basic audio recording backend application. There are two types of entities that need to be stored, `User` and `Recording`. These are represented as `Candid` records.

Each entity gets its own `StableBTreeMap`:

```typescript
import { blob, nat64, Principal, Record, StableBTreeMap } from 'azle';

type User = Record<{
    id: Principal;
    createdAt: nat64;
    recordingIds: Principal[];
    username: string;
}>;

type Recording = Record<{
    id: Principal;
    audio: blob;
    createdAt: nat64;
    name: string;
    userId: Principal;
}>;

let users = new StableBTreeMap<Principal, User>(0, 38, 100_000);
let recordings = new StableBTreeMap<Principal, Recording>(1, 38, 5_000_000);
```

Notice that each `StableBTreeMap` has a unique `memory id`. The maximum key and value sizes are also set according to the expected application usage.

You can figure out the appropriate maximum key and value sizes by reasoning about your application and engaging in some trial and error using the `insert` method. Calling `insert` on a `StableBTreeMap` will throw an error which in some cases will have the information that you need to determine the maximum key or value size.

If you attempt to insert a key or value that is too large, the `KeyTooLarge` and `ValueTooLarge` errors will show you the size of the value that you attempted to insert. You can increase the maximum key or value size based on the information you receive from the `KeyTooLarge` and `ValueTooLarge` errors and try inserting again.

Thus through some trial and error you can whittle your way to a correct solution. In some cases all of your values will have an obvious static maximum size. In the audio recording example, trial and error revealed that `Principal` is most likely always 38 bytes, thus the maximum key size is set to 38.

Maximum value sizes can be more tricky to figure out, especially if the values are records or variants with dynamic fields such as arrays. `User` has one such dynamic field, `recordingIds`. Since each recording id is a Principal, we know that each will take up 38 bytes. The other fields on `User` shouldn't take up too many bytes so we'll ignore them for our analysis.

We've set the maximum value size of `User` to be 100_000 bytes. If we divide 100_00 by 38, we get ~2_631. This will result in each user being able to store around that many recordings. That's acceptable for our example, and so we'll go with it.

As for `Recording`, the largest dynamic field is `audio`, which will be the actual bytes of the audio recording. We've set the maximum value size here to 5_000_000, which should allow for recordings of ~5 MB in size. That seems reasonable for our example, and so we'll go with it.

As you can see, finding the correct maximum key and value sizes is a bit of an art right now. Combining some trial and error with reasoning about your specific application should get you a working solution in most cases. It's our hope that the need to specify maximum key and value sizes will be removed in the future.

## Caveats

### Keys

You should be wary when using `float64`, `float32`, `service`, or `func` in any type that is a key for a stable structure. These types do not have the ability to be strictly ordered in all cases. `service` and `func` will have no order. `float64` and `float32` will treat `NaN` as less than any other type. These caveats may impact key performance.
