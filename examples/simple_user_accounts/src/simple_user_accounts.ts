import { Opt, $query, Record, $update } from 'azle';

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
export function get_user_by_id(id: string): Opt<User> {
    const user = db.users[id] ?? null;

    return user;
}

$query;
export function get_all_users(): User[] {
    return Object.values(db.users);
}

$update;
export function create_user(username: string): User {
    const id = Object.keys(db.users).length.toString();

    const user = {
        id,
        username
    };

    db.users[id] = user;

    return user;
}
