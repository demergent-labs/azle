import {
    blob,
    candid,
    ic,
    nat64,
    Opt,
    principal,
    Principal,
    query,
    Record,
    Result,
    Service,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec
} from 'azle';

class User extends Record {
    @candid(principal)
    id: Principal;

    @candid(nat64)
    createdAt: nat64;

    @candid(Vec(principal))
    recordingIds: Vec<Principal>;

    @candid(text)
    username: text;
}

class Recording extends Record {
    @candid(principal)
    id: Principal;

    @candid(blob)
    audio: blob;

    @candid(nat64)
    createdAt: nat64;

    @candid(text)
    name: text;

    @candid(principal)
    userId: Principal;
}

class AudioRecorderError extends Variant {
    @candid(principal)
    RecordingDoesNotExist: Principal;

    @candid(principal)
    UserDoesNotExist: Principal;
}

export default class extends Service {
    users = new StableBTreeMap<Principal, User>(principal, User as any, 0);
    recordings = new StableBTreeMap<Principal, Recording>(
        principal,
        Recording as any,
        1
    );

    @update([text], User)
    createUser(username: text): User {
        const id = generateId();
        const user: User = {
            id,
            createdAt: ic.time(),
            recordingIds: [],
            username
        };

        this.users.insert(user.id, user);

        return user;
    }

    @query([], Vec(User))
    readUsers(): Vec<User> {
        return this.users.values();
    }

    @query([principal], Opt(User))
    readUserById(id: Principal): Opt<User> {
        return this.users.get(id);
    }

    @update([principal], Result(User, AudioRecorderError))
    deleteUser(id: Principal): Result<User, AudioRecorderError> {
        const userOpt = this.users.get(id);

        if (userOpt.length === 0) {
            return {
                Err: AudioRecorderError.create({
                    UserDoesNotExist: id
                })
            };
        }

        const user = userOpt[0];

        user.recordingIds.forEach((recordingId) => {
            this.recordings.remove(recordingId);
        });

        this.users.remove(user.id);

        return {
            Ok: user
        };
    }

    @update([blob, text, principal], Result(Recording, AudioRecorderError))
    createRecording(
        audio: blob,
        name: text,
        userId: Principal
    ): Result<Recording, AudioRecorderError> {
        const userOpt = this.users.get(userId);

        if (userOpt.length === 0) {
            return {
                Err: AudioRecorderError.create({
                    UserDoesNotExist: userId
                })
            };
        }

        const user = userOpt[0];

        const id = generateId();
        const recording: Recording = {
            id,
            audio,
            createdAt: ic.time(),
            name,
            userId
        };

        this.recordings.insert(recording.id, recording);

        const updatedUser: User = {
            ...user,
            recordingIds: [...user.recordingIds, recording.id]
        };

        this.users.insert(updatedUser.id, updatedUser);

        return {
            Ok: recording
        };
    }

    @query([], Vec(Recording))
    readRecordings(): Vec<Recording> {
        return this.recordings.values();
    }

    @query([principal], Opt(Recording))
    readRecordingById(id: Principal): Opt<Recording> {
        return this.recordings.get(id);
    }

    @update([principal], Result(Recording, AudioRecorderError))
    deleteRecording(id: Principal): Result<Recording, AudioRecorderError> {
        const recordingOpt = this.recordings.get(id);

        if (recordingOpt.length === 0) {
            return {
                Err: AudioRecorderError.create({ RecordingDoesNotExist: id })
            };
        }

        const recording = recordingOpt[0];

        const userOpt = this.users.get(recording.userId);

        if (userOpt.length === 0) {
            return {
                Err: AudioRecorderError.create({
                    UserDoesNotExist: recording.userId
                })
            };
        }

        const user = userOpt[0];

        const updatedUser: User = {
            ...user,
            recordingIds: user.recordingIds.filter(
                (recordingId) => recordingId.toText() !== recording.id.toText()
            )
        };

        this.users.insert(updatedUser.id, updatedUser);

        this.recordings.remove(id);

        return {
            Ok: recording
        };
    }
}

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
