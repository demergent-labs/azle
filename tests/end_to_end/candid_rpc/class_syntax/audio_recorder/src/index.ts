//@ts-nocheck
import { IDL, query, update } from 'azle';

const User = IDL.Record({
    id: IDL.Principal,
    createdAt: IDL.Nat64,
    recordingIds: IDL.Vec(IDL.Principal),
    username: IDL.Text
});
type User = {
    id: Principal;
    createdAt: bigint;
    recordingIds: Principal[];
    username: string;
};

const Recording = IDL.Record({
    id: IDL.Principal,
    audio: IDL.Vec(IDL.Nat8),
    createdAt: IDL.Nat64,
    name: IDL.Text,
    userId: IDL.Principal
});
type Recording = {
    id: Principal;
    audio: Uint8Array;
    createdAt: bigint;
    name: string;
    userId: Principal;
};

function Result<T extends IDL.Type<any>, E extends IDL.Type<any>>(
    Ok: T,
    Err: E
): IDL.RecordClass {
    return IDL.Record({
        Ok: Ok,
        Err: Err
    });
}

const AudioRecorderError = IDL.Variant({
    RecordingDoesNotExist: IDL.Principal,
    UserDoesNotExist: IDL.Principal
});
type AudioRecorderError =
    | {
          RecordingDoesNotExist: Principal;
      }
    | {
          UserDoesNotExist: Principal;
      };

let users = StableBTreeMap<Principal, User>(0);
let recordings = StableBTreeMap<Principal, Recording>(1);

export default class {
    @update([IDL.Text], User)
    createUser(username: string): User {
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

    @query([], IDL.Vec(User))
    readUsers(): User[] {
        return users.values();
    }

    @query([Principal], IDL.Opt(User))
    readUserById(id): [User] | [] {
        return users.get(id);
    }

    @update([Principal], Result(User, AudioRecorderError))
    deleteUser(id): Result<User, AudioRecorderError> {
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
    }

    @update(
        [IDL.Vec(IDL.Nat8), IDL.Text, Principal],
        Result(Recording, AudioRecorderError)
    )
    createRecording(
        audio,
        name,
        userId
    ): Result<Recording, AudioRecorderError> {
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
    @query([], IDL.Vec(Recording))
    readRecordings(): Recording[] {
        return recordings.values();
    }

    @query([Principal], IDL.Opt(Recording))
    readRecordingById(id): [Recording] | [] {
        return recordings.get(id);
    }

    @update([Principal], Result(Recording, AudioRecorderError))
    deleteRecording(id): Result<Recording, AudioRecorderError> {
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
                (recordingId) => recordingId.toText() !== recording.id.toText()
            )
        };

        users.insert(updatedUser.id, updatedUser);

        recordings.remove(id);

        return Ok(recording);
    }
}

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
