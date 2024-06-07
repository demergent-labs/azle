import { Database, SqlValue } from 'sql.js/dist/sql-asm.js';

import { sqlite } from '../../db';

export type User = {
    id: number;
    username: string;
    age: number;
};
type UserCreate = Omit<User, 'id'>;
type UserUpdate = Pick<User, 'id'> & Partial<UserCreate>;

export function getUsers(db: Database, limit: number, offset: number): User[] {
    return sqlite<User>`SELECT * FROM users ORDER BY id LIMIT ${limit} OFFSET ${offset}`(
        db,
        convertUser
    );
}

export function getUser(db: Database, id: number): User | null {
    const users = sqlite<User>`SELECT * FROM users WHERE id = ${id}`(
        db,
        convertUser
    );

    return users.length === 0 ? null : users[0];
}

export function countUsers(db: Database): number {
    const results = sqlite<number>`SELECT COUNT(*) FROM users`(
        db,
        (sqlValues) => sqlValues[0] as number
    );

    return results[0] ?? 0;
}

export function createUser(db: Database, userCreate: UserCreate): User {
    sqlite`INSERT INTO users (username, age) VALUES (${userCreate.username}, ${userCreate.age})`(
        db
    );

    const id = sqlite<number>`SELECT last_insert_rowid()`(
        db,
        (sqlValues) => sqlValues[0] as number
    )[0];

    const user = getUser(db, id);

    if (user === null) {
        throw new Error(`updateUser: could not find user with id ${id}`);
    }

    return user;
}

export function updateUser(db: Database, userUpdate: UserUpdate): User {
    sqlite`UPDATE users SET username = COALESCE(${userUpdate.username}, username), age = COALESCE(${userUpdate.age}, age) WHERE id = ${userUpdate.id}`(
        db
    );

    const user = getUser(db, userUpdate.id);

    if (user === null) {
        throw new Error(
            `updateUser: could not find user with id ${userUpdate.id}`
        );
    }

    return user;
}

export function deleteUser(db: Database, id: number): number {
    sqlite`DELETE FROM users WHERE id = ${id}`(db);

    const user = getUser(db, id);

    if (user !== null) {
        throw new Error(`deleteUser: could not delete user with id ${id}`);
    }

    return id;
}

export function convertUser(sqlValues: SqlValue[]): User {
    return {
        id: sqlValues[0] as number,
        username: sqlValues[1] as string,
        age: sqlValues[2] as number
    };
}
