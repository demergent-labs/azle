// TODO the db stuff should be separated out into the db...
// TODO well actually no, I think users and posts should just be their own
// TODO thing grouped by functionality...so maybe just server needs to be changed...
// TODO to just be a file, and then we have users and posts directories

// TODO how do we deal with joins in our little template tag thing?
// TODO we need to add all of the joins

// TODO figure out joins!!!

import { Database, QueryExecResult, SqlValue } from 'sql.js/dist/sql-asm.js';

type Post = {
    id: number;
    user_id: number;
    title: string;
    body: string;
};

type PostCreate = Pick<Post, 'user_id' | 'title' | 'body'>;

export function getPosts(db: Database, limit: number, offset: number): Post[] {
    const queryExecResults = db.exec(
        `SELECT * FROM posts ORDER BY id LIMIT :limit OFFSET :offset`,
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

export function getPost(db: Database, id: number): Post | null {
    const queryExecResults = db.exec('SELECT * FROM posts WHERE id=:id', {
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

export function countPosts(db: Database): number {
    const queryExecResults = db.exec(
        'SELECT id FROM posts ORDER BY id DESC LIMIT 1'
    );
    const queryExecResult = queryExecResults[0] as QueryExecResult | undefined;

    if (queryExecResult === undefined) {
        return 0;
    } else {
        return queryExecResult.values[0][0] as number;
    }
}

export function createPost(db: Database, postCreate: PostCreate): number {
    db.run(
        'INSERT INTO posts (user_id, title, body) VALUES (:user_id, :title, :body)',
        {
            ':user_id': postCreate.user_id,
            ':title': postCreate.title,
            ':body': postCreate.body
        }
    );

    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0] as number;

    return id;
}

export function convertQueryExecResultToUser(sqlValues: SqlValue[]): Post {
    return {
        id: sqlValues[0] as number,
        user_id: sqlValues[1] as number,
        title: sqlValues[2] as string,
        body: sqlValues[3] as string
    };
}
