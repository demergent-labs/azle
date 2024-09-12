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

export default class {
    users = StableBTreeMap<Principal, User>(0);
    recordings = StableBTreeMap<Principal, Recording>(1);

    @update([IDL.Text], User)
    createUser(username: string): User {
        const id = generateId();
        const user: User = {
            id,
            createdAt: time(),
            recordingIds: [],
            username
        };

        this.users.insert(user.id, user);

        return user;
    }

    @query([], IDL.Vec(User))
    readUsers(): User[] {
        return this.users.values();
    }

    @query([IDL.Principal], IDL.Opt(User))
    readUserById(id: Principal): [User] | [] {
        const result = this.users.get(id);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Principal], User)
    deleteUser(id: Principal): User {
        const user = this.users.get(id);

        if (user === null) {
            throw new Error(`User does not exist: ${id.toText()}`);
        }

        user.recordingIds.forEach((recordingId) => {
            this.recordings.remove(recordingId);
        });

        this.users.remove(user.id);

        return user;
    }

    @update([IDL.Vec(IDL.Nat8), IDL.Text, IDL.Principal], Recording)
    createRecording(
        audio: Uint8Array,
        name: string,
        userId: Principal
    ): Recording {
        const user = this.users.get(userId);

        if (user === null) {
            throw new Error(`User does not exist: ${userId.toText()}`);
        }

        const id = generateId();
        const recording: Recording = {
            id,
            audio,
            createdAt: time(),
            name,
            userId
        };

        this.recordings.insert(recording.id, recording);

        const updatedUser: User = {
            ...user,
            recordingIds: [...user.recordingIds, recording.id]
        };

        this.users.insert(updatedUser.id, updatedUser);

        return recording;
    }

    @query([], IDL.Vec(Recording))
    readRecordings(): Recording[] {
        return this.recordings.values();
    }

    @query([IDL.Principal], IDL.Opt(Recording))
    readRecordingById(id: Principal): [Recording] | [] {
        const result = this.recordings.get(id);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Principal], Recording)
    deleteRecording(id: Principal): Recording {
        const recording = this.recordings.get(id);

        if (recording === null) {
            throw new Error(`Recording does not exist: ${id.toText()}`);
        }

        const user = this.users.get(recording.userId);

        if (user === null) {
            throw new Error(
                `User does not exist: ${recording.userId.toText()}`
            );
        }

        const updatedUser: User = {
            ...user,
            recordingIds: user.recordingIds.filter(
                (recordingId) => recordingId.toText() !== recording.id.toText()
            )
        };

        this.users.insert(updatedUser.id, updatedUser);

        this.recordings.remove(id);

        return recording;
    }
}

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
