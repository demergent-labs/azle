import {
    Query,
    Update,
    Opt
} from 'azle';

type DB = {
    users: {
        [id: string]: User;
    };
};

type User = {
    id: string;
    username: string;
};

let db: DB = {
    users: {}
};

export function getUserById(id: string): Query<Opt<User>> {
    const user = db.users[id] ?? null;

    return user;
}

export function getAllUsers(): Query<User[]> {
    return Object.values(db.users);
}

export function createUser(username: string): Update<User> {
    const id = Object.keys(db.users).length.toString();
    
    const user = {
        id,
        username
    };

    db.users[id] = user;

    return user;
}