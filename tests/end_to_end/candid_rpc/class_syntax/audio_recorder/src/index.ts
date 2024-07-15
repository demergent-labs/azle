import { IDL, Principal, query, StableBTreeMap, time, update } from 'azle';

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

let users = StableBTreeMap<Principal, User>(0);
let recordings = StableBTreeMap<Principal, Recording>(1);

export default class {
    @update([IDL.Text], User)
    createUser(username: string): User {
        const id = generateId();
        const user: User = {
            id,
            createdAt: time(),
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

    @query([IDL.Principal], IDL.Opt(User))
    readUserById(id: Principal): [User] | [] {
        const result = users.get(id);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Principal], User)
    deleteUser(id: Principal): User {
        const userOpt = users.get(id);

        if (userOpt === null) {
            throw new Error(`User does not exist: ${id.toText()}`);
        }

        const user = userOpt;

        user.recordingIds.forEach((recordingId) => {
            recordings.remove(recordingId);
        });

        users.remove(user.id);

        return user;
    }

    @update([IDL.Vec(IDL.Nat8), IDL.Text, IDL.Principal], Recording)
    createRecording(
        audio: Uint8Array,
        name: string,
        userId: Principal
    ): Recording {
        console.log('You are saying we are not even getting this far?');
        const userOpt = users.get(userId);
        console.log(1);

        if (userOpt === null) {
            throw new Error(`User does not exist: ${userId.toText()}`);
        }

        console.log(2);
        const user = userOpt;

        console.log(3);
        const id = generateId();
        const recording: Recording = {
            id,
            audio,
            createdAt: time(),
            name,
            userId
        };
        console.log(4);

        recordings.insert(recording.id, recording);

        console.log(5);
        const updatedUser: User = {
            ...user,
            recordingIds: [...user.recordingIds, recording.id]
        };

        console.log(6);
        users.insert(updatedUser.id, updatedUser);

        console.log(7);
        return recording;
    }

    @query([], IDL.Vec(Recording))
    readRecordings(): Recording[] {
        return recordings.values();
    }

    @query([IDL.Principal], IDL.Opt(Recording))
    readRecordingById(id: Principal): [Recording] | [] {
        const result = recordings.get(id);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Principal], Recording)
    deleteRecording(id: Principal): Recording {
        const recordingOpt = recordings.get(id);

        if (recordingOpt === null) {
            throw new Error(`Recording does not exist: ${id.toText()}`);
        }

        const recording = recordingOpt;

        const userOpt = users.get(recording.userId);

        if (userOpt === null) {
            throw new Error(
                `User does not exist: ${recording.userId.toText()}`
            );
        }

        const user = userOpt;

        const updatedUser: User = {
            ...user,
            recordingIds: user.recordingIds.filter(
                (recordingId) => recordingId.toText() !== recording.id.toText()
            )
        };

        users.insert(updatedUser.id, updatedUser);

        recordings.remove(id);

        return recording;
    }
}

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
