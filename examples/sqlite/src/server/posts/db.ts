// TODO the db stuff should be separated out into the db...
// TODO well actually no, I think users and posts should just be their own
// TODO thing grouped by functionality...so maybe just server needs to be changed...
// TODO to just be a file, and then we have users and posts directories

import { Database, QueryExecResult, SqlValue } from 'sql.js/dist/sql-asm.js';

import { User } from '../users/db';

type Post = {
    id: number;
    title: string;
    body: string;
    user: User;
};

type PostCreate = Pick<Post, 'title' | 'body'> & { user_id: number };
type PostUpdate = Pick<Post, 'id'> & Partial<PostCreate>;

export function getPosts(db: Database, limit: number, offset: number): Post[] {
    const queryExecResults = db.exec(
        `SELECT * FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.id LIMIT :limit OFFSET :offset`,
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
    const queryExecResults = db.exec(
        'SELECT * FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id=:id',
        {
            ':id': id
        }
    );

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

export function createPost(db: Database, postCreate: PostCreate): Post {
    db.run(
        'INSERT INTO posts (user_id, title, body) VALUES (:user_id, :title, :body)',
        {
            ':user_id': postCreate.user_id,
            ':title': postCreate.title,
            ':body': postCreate.body
        }
    );

    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0] as number;

    const post = getPost(db, id);

    if (post === null) {
        throw new Error(`createPost: could not post with id ${id}`);
    }

    return post;
}

export function updatePost(db: Database, postUpdate: PostUpdate): Post {
    db.run(
        `UPDATE posts SET user_id = COALESCE(:user_id, user_id), title = COALESCE(:title, title), body = COALESCE(:body, body) WHERE id = :id`,
        {
            ':id': postUpdate.id,
            ':user_id': postUpdate.user_id ?? null,
            ':title': postUpdate.title ?? null,
            ':body': postUpdate.body ?? null
        }
    );

    const post = getPost(db, postUpdate.id);

    if (post === null) {
        throw new Error(
            `updatePost: could not find post with id ${postUpdate.id}`
        );
    }

    return post;
}

export function deletePost(db: Database, id: number): number {
    db.run(`DELETE FROM posts WHERE id = :id`, {
        ':id': id
    });

    const post = getPost(db, id);

    if (post !== null) {
        throw new Error(`deletePost: could not delete post with id ${id}`);
    }

    return id;
}

export function convertQueryExecResultToUser(sqlValues: SqlValue[]): Post {
    return {
        id: sqlValues[0] as number,
        title: sqlValues[2] as string,
        body: sqlValues[3] as string,
        user: {
            id: sqlValues[4] as number,
            username: sqlValues[5] as string,
            age: sqlValues[6] as number
        }
    };
}
