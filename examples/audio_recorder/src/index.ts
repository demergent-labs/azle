import {
    blob,
    Canister,
    ic,
    nat64,
    Opt,
    principal,
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
    id: principal,
    createdAt: nat64,
    recordingIds: Vec(principal),
    username: text
});

const Recording = Record({
    id: principal,
    audio: blob,
    createdAt: nat64,
    name: text,
    userId: principal
});

const AudioRecorderError = Variant({
    RecordingDoesNotExist: principal,
    UserDoesNotExist: principal
});

let users = StableBTreeMap(principal, User, 0);
let recordings = StableBTreeMap(principal, Recording, 1);

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
    readUserById: query([principal], Opt(User), (id) => {
        return users.get(id);
    }),
    deleteUser: update([principal], Result(User, AudioRecorderError), (id) => {
        const userOpt = users.get(id);

        if (userOpt.length === 0) {
            return {
                Err: {
                    UserDoesNotExist: id
                }
            };
        }

        const user = userOpt[0];

        user.recordingIds.forEach((recordingId) => {
            recordings.remove(recordingId);
        });

        users.remove(user.id);

        return {
            Ok: user
        };
    }),
    createRecording: update(
        [blob, text, principal],
        Result(Recording, AudioRecorderError),
        (audio: blob, name: text, userId: Principal) => {
            const userOpt = users.get(userId);

            if (userOpt.length === 0) {
                return {
                    Err: {
                        UserDoesNotExist: userId
                    }
                };
            }

            const user = userOpt[0];

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

            return {
                Ok: recording
            };
        }
    ),
    readRecordings: query([], Vec(Recording), () => {
        return recordings.values();
    }),
    readRecordingById: query([principal], Opt(Recording), (id) => {
        return recordings.get(id);
    }),
    deleteRecording: update(
        [principal],
        Result(Recording, AudioRecorderError),
        (id) => {
            const recordingOpt = recordings.get(id);

            if (recordingOpt.length === 0) {
                return {
                    Err: { RecordingDoesNotExist: id }
                };
            }

            const recording = recordingOpt[0];

            const userOpt = users.get(recording.userId);

            if (userOpt.length === 0) {
                return {
                    Err: {
                        UserDoesNotExist: recording.userId
                    }
                };
            }

            const user = userOpt[0];

            const updatedUser: typeof User = {
                ...user,
                recordingIds: user.recordingIds.filter(
                    (recordingId) =>
                        recordingId.toText() !== recording.id.toText()
                )
            };

            users.insert(updatedUser.id, updatedUser);

            recordings.remove(id);

            return {
                Ok: recording
            };
        }
    )
});

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
