import { Opt, $query, Record, $update, Vec } from 'azle';

type Db = {
    users: {
        [id: string]: User;
    };
};

type User = Record<{
    id: string;
    username: string;
}>;

let db: Db = {
    users: {}
};

$query;
export function getUserById(id: string): Opt<User> {
    const userOrUndefined = db.users[id];

    return userOrUndefined ? Opt.Some(userOrUndefined) : Opt.None;
}

$query;
export function getAllUsers(): Vec<User> {
    return Object.values(db.users);
}

$update;
export function createUser(username: string): User {
    const id = Object.keys(db.users).length.toString();

    const user = {
        id,
        username
    };

    db.users[id] = user;

    return user;
}
