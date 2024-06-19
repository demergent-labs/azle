import { IDL, query, update } from 'azle';

type Db = {
    users: {
        [id: string]: User;
    };
};

let db: Db = {
    users: {}
};

const User = IDL.Record({
    id: IDL.Text,
    username: IDL.Text
});
type User = {
    id: string;
    username: string;
};

export default class {
    @query([IDL.Text], IDL.Opt(User))
    getUserById(id: string): [User] | [] {
        const userOrUndefined = db.users[id];
        return userOrUndefined ? [userOrUndefined] : [];
    }

    @query([], IDL.Vec(User))
    getAllUsers(): User[] {
        return Object.values(db.users);
    }

    @update([IDL.Text], User)
    createUser(username: string): User {
        const id = Object.keys(db.users).length.toString();
        const user: User = {
            id,
            username
        };

        db.users[id] = user;

        return user;
    }
}
