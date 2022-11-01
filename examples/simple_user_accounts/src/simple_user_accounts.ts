import { Opt, Query, Update } from 'azle';

type Db = {
    users: {
        [id: string]: User;
    };
};

type User = {
    id: string;
    username: string;
};

let db: Db = {
    users: {}
};

export function get_user_by_id(id: string): Query<Opt<User>> {
    const user = db.users[id] ?? null;

    return user;
}

export function get_all_users(): Query<User[]> {
    return Object.values(db.users);
}

export function create_user(username: string): Update<User> {
    const id = Object.keys(db.users).length.toString();

    const user = {
        id,
        username
    };

    db.users[id] = user;

    return user;
}
