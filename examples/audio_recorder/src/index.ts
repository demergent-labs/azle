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
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

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

$update;
export function createUser(username: string): Variant<{
    Ok: User;
    Err: InsertError;
}> {
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
export function readUsers(): User[] {
    return users.values();
}

$query;
export function readUserById(id: Principal): Opt<User> {
    return users.get(id);
}

$update;
export function deleteUser(id: Principal): Variant<{
    Ok: User;
    Err: Variant<{
        UserDoesNotExist: Principal;
    }>;
}> {
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
): Variant<{
    Ok: Recording;
    Err: Variant<{
        InsertError: InsertError;
        UserDoesNotExist: Principal;
    }>;
}> {
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
export function readRecordings(): Recording[] {
    return recordings.values();
}

$query;
export function readRecordingById(id: Principal): Opt<Recording> {
    return recordings.get(id);
}

$update;
export function delete_recording(id: Principal): Variant<{
    Ok: Recording;
    Err: Variant<{
        InsertError: InsertError;
        RecordingDoesNotExist: Principal;
        UserDoesNotExist: Principal;
    }>;
}> {
    const recording = recordings.get(id);

    if (recording === null) {
        return {
            Err: {
                RecordingDoesNotExist: id
            }
        };
    }

    const user = users.get(recording.user_id);

    if (user === null) {
        return {
            Err: {
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

    return match(update_user_result, {
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

function generate_id(): Principal {
    const random_bytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(random_bytes));
}
