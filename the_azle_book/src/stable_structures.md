# Stable Structures

## TLDR

-   96 GiB of stable memory
-   Persistent across upgrades
-   Familiar API
-   Must specify memory id
-   No migrations per memory id

Stable structures are data structures with familiar APIs that allow write and read access to stable memory. Stable memory is a separate memory location from the heap that currently allows up to 96 GiB of binary storage. Stable memory persists automatically across upgrades.

Persistence on the Internet Computer (IC) is very important to understand. When a canister is upgraded (its code is changed after being initially deployed) its heap is wiped. This includes all global variables.

On the other hand, anything stored in stable memory will be preserved. Writing and reading to and from stable memory can be done with a [low-level API](./reference/stable_memory/stable_memory.md), but it is generally easier and preferable to use stable structures.

Azle currently provides one stable structure called `StableBTreeMap`. It's similar to a [JavaScript Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and has most of the common operations you'd expect such as reading, inserting, and removing values.

Here's how to define a simple `StableBTreeMap`:

```typescript
import { nat8, StableBTreeMap, text } from 'azle';

let map = StableBTreeMap<nat8, text>(0);
```

This is a `StableBTreeMap` with a key of type `nat8` and a value of type `text`. Unless you want a default type of `any` for your `key` and `value`, then you must explicitly type your `StableBTreeMap` with type arguments.

`StableBTreeMap` works by encoding and decoding values under-the-hood, storing and retrieving these values in bytes in stable memory. When writing to and reading from a `StableBTreeMap`, by default the `stableJson` `Serializable object` is used to encode JS values into bytes and to decode JS values from bytes. `stableJson` uses `JSON.stringify` and `JSON.parse` with a custom `replacer` and `reviver` to handle many `Candid` and other values that you will most likely use in your canisters.

You may use other `Serializable objects` besides `stableJson`, and you can even create your own. Simply pass in a `Serializable object` as the second and third parameters to your `StableBTreeMap`. The second parameter is the `key` `Serializable object` and the third parameter is the `value` `Serializable object`. For example, the following `StableBTreeMap` uses the `nat8` and `text` `CandidType objects` from Azle as `Serializable objects`. These `Serializable objects` will encode and decode to and from Candid bytes:

```typescript
import { nat8, StableBTreeMap, text } from 'azle';

let map = StableBTreeMap<nat8, text>(0, nat8, text);
```

All `CandidType` objects imported from `azle` are `Serializable objects`.

A `Serializable object` simply has a `toBytes` method that takes a JS value and returns a `Uint8Array`, and a `fromBytes` method that takes a `Uint8Array` and returns a JS value.

Here's an example of how to create your own simple `JSON` `Serializable`:

```typescript
export interface Serializable {
    toBytes: (data: any) => Uint8Array;
    fromBytes: (bytes: Uint8Array) => any;
}

export function StableSimpleJson(): Serializable {
    return {
        toBytes(data: any) {
            const result = JSON.stringify(data);
            return Uint8Array.from(Buffer.from(result));
        },
        fromBytes(bytes: Uint8Array) {
            return JSON.parse(Buffer.from(bytes).toString());
        }
    };
}
```

This `StableBTreeMap` also has a `memory id` of `0`. Each `StableBTreeMap` instance must have a unique `memory id` between `0` and `254`. Once a `memory id` is allocated, it cannot be used with a different `StableBTreeMap`. This means you can't create another `StableBTreeMap` using the same `memory id`, and you can't change the key or value types of an existing `StableBTreeMap`. [This problem will be addressed to some extent](https://github.com/demergent-labs/azle/issues/843).

Here's an example showing all of the basic `StableBTreeMap` operations:

```typescript
import {
    bool,
    Canister,
    nat64,
    nat8,
    Opt,
    query,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec
} from 'azle';

const Key = nat8;
type Key = typeof Key.tsType;

const Value = text;
type Value = typeof Value.tsType;

let map = StableBTreeMap<Key, Value>(0);

export default Canister({
    containsKey: query([Key], bool, (key) => {
        return map.containsKey(key);
    }),

    get: query([Key], Opt(Value), (key) => {
        return map.get(key);
    }),

    insert: update([Key, Value], Opt(Value), (key, value) => {
        return map.insert(key, value);
    }),

    isEmpty: query([], bool, () => {
        return map.isEmpty();
    }),

    items: query([], Vec(Tuple(Key, Value)), () => {
        return map.items();
    }),

    keys: query([], Vec(Key), () => {
        return Uint8Array.from(map.keys());
    }),

    len: query([], nat64, () => {
        return map.len();
    }),

    remove: update([Key], Opt(Value), (key) => {
        return map.remove(key);
    }),

    values: query([], Vec(Value), () => {
        return map.values();
    })
});
```

With these basic operations you can build more complex CRUD database applications:

```typescript
import {
    blob,
    Canister,
    ic,
    Err,
    nat64,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec
} from 'azle';

const User = Record({
    id: Principal,
    createdAt: nat64,
    recordingIds: Vec(Principal),
    username: text
});
type User = typeof User.tsType;

const Recording = Record({
    id: Principal,
    audio: blob,
    createdAt: nat64,
    name: text,
    userId: Principal
});
type Recording = typeof Recording.tsType;

const AudioRecorderError = Variant({
    RecordingDoesNotExist: Principal,
    UserDoesNotExist: Principal
});
type AudioRecorderError = typeof AudioRecorderError.tsType;

let users = StableBTreeMap<Principal, User>(0);
let recordings = StableBTreeMap<Principal, Recording>(1);

export default Canister({
    createUser: update([text], User, (username) => {
        const id = generateId();
        const user: User = {
            id,
            createdAt: ic.time(),
            recordingIds: [],
            username
        };

        users.insert(user.id, user);

        return user;
    }),
    readUsers: query([], Vec(User), () => {
        return users.values();
    }),
    readUserById: query([Principal], Opt(User), (id) => {
        return users.get(id);
    }),
    deleteUser: update([Principal], Result(User, AudioRecorderError), (id) => {
        const userOpt = users.get(id);

        if ('None' in userOpt) {
            return Err({
                UserDoesNotExist: id
            });
        }

        const user = userOpt.Some;

        user.recordingIds.forEach((recordingId) => {
            recordings.remove(recordingId);
        });

        users.remove(user.id);

        return Ok(user);
    }),
    createRecording: update(
        [blob, text, Principal],
        Result(Recording, AudioRecorderError),
        (audio, name, userId) => {
            const userOpt = users.get(userId);

            if ('None' in userOpt) {
                return Err({
                    UserDoesNotExist: userId
                });
            }

            const user = userOpt.Some;

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

            return Ok(recording);
        }
    ),
    readRecordings: query([], Vec(Recording), () => {
        return recordings.values();
    }),
    readRecordingById: query([Principal], Opt(Recording), (id) => {
        return recordings.get(id);
    }),
    deleteRecording: update(
        [Principal],
        Result(Recording, AudioRecorderError),
        (id) => {
            const recordingOpt = recordings.get(id);

            if ('None' in recordingOpt) {
                return Err({ RecordingDoesNotExist: id });
            }

            const recording = recordingOpt.Some;

            const userOpt = users.get(recording.userId);

            if ('None' in userOpt) {
                return Err({
                    UserDoesNotExist: recording.userId
                });
            }

            const user = userOpt.Some;

            const updatedUser: User = {
                ...user,
                recordingIds: user.recordingIds.filter(
                    (recordingId) =>
                        recordingId.toText() !== recording.id.toText()
                )
            };

            users.insert(updatedUser.id, updatedUser);

            recordings.remove(id);

            return Ok(recording);
        }
    )
});

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
import {
    blob,
    Canister,
    ic,
    Err,
    nat64,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec
} from 'azle';

const User = Record({
    id: Principal,
    createdAt: nat64,
    recordingIds: Vec(Principal),
    username: text
});
type User = typeof User.tsType;

const Recording = Record({
    id: Principal,
    audio: blob,
    createdAt: nat64,
    name: text,
    userId: Principal
});
type Recording = typeof Recording.tsType;

const AudioRecorderError = Variant({
    RecordingDoesNotExist: Principal,
    UserDoesNotExist: Principal
});
type AudioRecorderError = typeof AudioRecorderError.tsType;

let users = StableBTreeMap<Principal, User>(0);
let recordings = StableBTreeMap<Principal, Recording>(1);
```

Notice that each `StableBTreeMap` has a unique `memory id`. You can begin to create basic database CRUD functionality by creating one `StableBTreeMap` per entity. It's up to you to create functionality for querying, filtering, and relations. `StableBTreeMap` is not a full-featured database solution, but a fundamental building block that may enable you to achieve more advanced database functionality.

Demergent Labs plans to deeply explore database solutions on the IC in the future.

## Caveats

### float64 values

It seems to be only some `float64` values cannot be successfully stored and retrieved with a `StableBTreeMap` using `stableJson` because of this bug with `JSON.parse`: https://github.com/bellard/quickjs/issues/206

### CandidType Performance

Azle's Candid encoding/decoding implementation is currently not well optimized, and Candid may not be the most optimal encoding format overall, so you may experience heavy instruction usage when performing many `StableBTreeMap` operations in succession. A rough idea of the overhead from our preliminary testing is probably 1-2 million instructions for a full Candid encoding and decoding of values per `StableBTreeMap` operation.

For these reasons we recommend using the `stableJson` `Serializable object` (the default) instead of `CandidType` `Serializable objects`.

### Migrations

Migrations must be performed manually by reading the values out of one `StableBTreeMap` and writing them into another. Once a `StableBTreeMap` is initialized to a specific `memory id`, that `memory id` cannot be changed unless the canister is completely wiped and initialized again.

### Canister

`Canister` values do not currently work with the default `stableJson` implementation. If you must persist `Canister`s, consider using the `Canister` `CandidType object` as your `Serializable object` in your `StableBTreeMap`, or create a custom `replacer` or `reviver` for `stableJson` that handles `Canister`.
