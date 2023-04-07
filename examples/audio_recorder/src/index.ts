import {
    blob,
    ic,
    InsertError,
    match,
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
export function createUser(username: string): Result<User, InsertError> {
    const id = generateId();
    const user: User = {
        id,
        createdAt: ic.time(),
        recordingIds: [],
        username
    };

    const result = users.insert(user.id, user);

    return match(result, {
        Ok: () => ({ Ok: user }),
        Err: (err) => ({ Err: err })
    });
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
        InsertError: InsertError;
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

    const createRecordingResult = recordings.insert(recording.id, recording);

    return match(createRecordingResult, {
        Ok: () => {
            const updatedUser: User = {
                ...user,
                recordingIds: [...user.recordingIds, recording.id]
            };
            const updateUserResult = users.insert(updatedUser.id, updatedUser);

            return match(updateUserResult, {
                Ok: () => ({
                    Ok: recording
                }),
                Err: (err) => ({
                    Err: {
                        InsertError: err
                    }
                })
            });
        },
        Err: (err) => ({
            Err: {
                InsertError: err
            }
        })
    });
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
        InsertError: InsertError;
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

    const updateUserResult = users.insert(updatedUser.id, updatedUser);

    return match(updateUserResult, {
        Ok: () => {
            recordings.remove(id);

            return {
                Ok: recording
            };
        },
        Err: (err) => ({
            Err: {
                InsertError: err
            }
        })
    });
}

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
