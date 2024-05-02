import { Database, QueryExecResult, SqlValue } from 'sql.js/dist/sql-asm.js';

export type User = {
    id: number;
    username: string;
    age: number;
};

type UserCreate = Pick<User, 'username' | 'age'>;

export function getUsers(db: Database, limit: number, offset: number): User[] {
    const queryExecResults = db.exec(
        `SELECT * FROM users ORDER BY id LIMIT :limit OFFSET :offset`,
        {
            ':limit': limit,
            ':offset': offset
        }
    );
    const queryExecResult = queryExecResults[0] as QueryExecResult | undefined;

    return (
        queryExecResult?.values.map((sqlValues) => {
            return convertQueryExecResultToUser(sqlValues);
        }) ?? []
    );
}

export function getUser(db: Database, id: number): User | null {
    const queryExecResults = db.exec('SELECT * FROM users WHERE id=:id', {
        ':id': id
    });
    const queryExecResult = queryExecResults[0] as QueryExecResult | undefined;

    if (queryExecResult === undefined) {
        return null;
    } else {
        return queryExecResult.values.map((sqlValues) => {
            return convertQueryExecResultToUser(sqlValues);
        })[0];
    }
}

export function countUsers(db: Database): number {
    const queryExecResults = db.exec(
        'SELECT id FROM users ORDER BY id DESC LIMIT 1'
    );
    const queryExecResult = queryExecResults[0] as QueryExecResult | undefined;

    if (queryExecResult === undefined) {
        return 0;
    } else {
        return queryExecResult.values[0][0] as number;
    }
}

export function createUser(db: Database, userCreate: UserCreate): number {
    db.run('INSERT INTO users (username, age) VALUES (:username, :age)', {
        ':username': userCreate.username,
        ':age': userCreate.age
    });

    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0] as number;

    return id;
}

export function convertQueryExecResultToUser(sqlValues: SqlValue[]): User {
    return {
        id: sqlValues[0] as number,
        username: sqlValues[1] as string,
        age: sqlValues[2] as number
    };
}
