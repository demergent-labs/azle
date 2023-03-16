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

    return match(result, {
        ok: () => ({ ok: user }),
        err: (err) => ({ err })
    });
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

    return match(create_recording_result, {
        ok: () => {
            const updated_user: User = {
                ...user,
                recording_ids: [...user.recording_ids, recording.id]
            };
            const update_user_result = users.insert(
                updated_user.id,
                updated_user
            );

            return match(update_user_result, {
                ok: () => ({
                    ok: recording
                }),
                err: (err) => ({
                    err: {
                        InsertError: err
                    }
                })
            });
        },
        err: (err) => ({
            err: {
                InsertError: err
            }
        })
    });
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

    return match(update_user_result, {
        ok: () => {
            recordings.remove(id);

            return {
                ok: recording
            };
        },
        err: (err) => ({
            err: {
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
