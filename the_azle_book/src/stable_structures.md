# Stable Structures

## TLDR

-   96 GiB of stable memory
-   Persistent across upgrades
-   Familiar API
-   Must specify memory id
-   No migrations per memory id

Stable structures are data structures with familiar APIs that allow access to stable memory. Stable memory is a separate memory location from the heap that currently allows up to 96 GiB of storage. Stable memory persists automatically across upgrades.

Persistence on the Internet Computer (IC) is very important to understand. When a canister is upgraded (its code is changed after being initially deployed) its heap is wiped. This includes all global variables.

On the other hand, anything stored in stable memory will be preserved. Writing and reading to and from stable memory can be done with a [low-level API](./reference/stable_memory/stable_memory.md), but it is generally easier and preferable to use stable structures.

Azle currently provides one stable structure called `StableBTreeMap`. It's similar to a [JavaScript Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and has most of the common operations you'd expect such as reading, inserting, and removing values.

Here's how to define a simple `StableBTreeMap`:

```typescript
import { nat8, StableBTreeMap, text } from 'azle';

let map = StableBTreeMap(nat8, text, 0);
```

This is a `StableBTreeMap` with a key of type `nat8` and a value of type `text`. Key and value types can be any [Candid type](candid.md).

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
const Value = text;

let map = StableBTreeMap(Key, Value, 0);

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
        return map.keys();
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

const Recording = Record({
    id: Principal,
    audio: blob,
    createdAt: nat64,
    name: text,
    userId: Principal
});

const AudioRecorderError = Variant({
    RecordingDoesNotExist: Principal,
    UserDoesNotExist: Principal
});

let users = StableBTreeMap(Principal, User, 0);
let recordings = StableBTreeMap(Principal, Recording, 1);

export default Canister({
    createUser: update([text], User, (username) => {
        const id = generateId();
        const user: typeof User = {
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
            const recording: typeof Recording = {
                id,
                audio,
                createdAt: ic.time(),
                name,
                userId
            };

            recordings.insert(recording.id, recording);

            const updatedUser: typeof User = {
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

            const updatedUser: typeof User = {
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
    nat64,
    Principal,
    Record,
    StableBTreeMap,
    text,
    Vec
} from 'azle';

const User = Record({
    id: Principal,
    createdAt: nat64,
    recordingIds: Vec(Principal),
    username: text
});

const Recording = Record({
    id: Principal,
    audio: blob,
    createdAt: nat64,
    name: text,
    userId: Principal
});

let users = StableBTreeMap(Principal, User, 0);
let recordings = StableBTreeMap(Principal, Recording, 1);
```

Notice that each `StableBTreeMap` has a unique `memory id`.

## Caveats

### Performance

Azle's `StableBTreeMap` uses Candid encoding and decoding to store and retrieve all values. Azle's Candid encoding/decoding implementation is currently not well optimized, and Candid may not be the most optimal encoding format overall, so you may experience heavy instruction usage when performing many `StableBTreeMap` operations in succession. A rough idea of the overhead from our preliminary testing is probably 1-2 million instructions for a full Candid encoding and decoding of values per `StableBTreeMap` operation.

### Migrations

Migrations must be performed manually by reading the values out of one `StableBTreeMap` and writing them into another. Once a `StableBTreeMap` is initialized to a specific `memory id`, that `memory id` cannot be changed unless the canister is completely wiped and initialized again.
