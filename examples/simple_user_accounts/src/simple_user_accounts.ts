import {
    candid,
    None,
    Opt,
    query,
    Record,
    Service,
    Some,
    text,
    update,
    Vec
} from 'azle';

type Db = {
    users: {
        [id: string]: User;
    };
};

class User extends Record {
    @candid(text)
    id: text;

    @candid(text)
    username: text;
}

export default class extends Service {
    db: Db = {
        users: {}
    };

    @query([text], Opt(User))
    getUserById(id: text): Opt<User> {
        const userOrUndefined = this.db.users[id];

        return userOrUndefined ? Some(userOrUndefined) : None;
    }

    @query([], Vec(User))
    getAllUsers(): Vec<User> {
        return Object.values(this.db.users);
    }

    @update([text], User)
    createUser(username: text): User {
        const id = Object.keys(this.db.users).length.toString();

        const user = {
            id,
            username
        };

        this.db.users[id] = user;

        return user;
    }
}
