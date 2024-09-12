import { IDL, query, update } from 'azle';

type Db = {
    users: {
        [id: string]: User;
    };
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
    db: Db = {
        users: {}
    };

    @query([IDL.Text], IDL.Opt(User))
    getUserById(id: string): [User] | [] {
        const userOrUndefined = this.db.users[id];
        return userOrUndefined ? [userOrUndefined] : [];
    }

    @query([], IDL.Vec(User))
    getAllUsers(): User[] {
        return Object.values(this.db.users);
    }

    @update([IDL.Text], User)
    createUser(username: string): User {
        const id = Object.keys(this.db.users).length.toString();
        const user: User = {
            id,
            username
        };

        this.db.users[id] = user;

        return user;
    }
}
