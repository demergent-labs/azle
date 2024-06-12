import { Database, SqlValue } from 'sql.js/dist/sql-asm.js';

import { sqlite } from '../../db';
import { User } from '../users/db';

type Post = {
    id: number;
    title: string;
    body: string;
    user: User;
};
type PostCreate = Omit<Post, 'id' | 'user'> & { user_id: number };
type PostUpdate = Pick<Post, 'id'> & Partial<PostCreate>;

export function getPosts(db: Database, limit: number, offset: number): Post[] {
    return sqlite<Post>`SELECT * FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.id LIMIT ${limit} OFFSET ${offset}`(
        db,
        convertPost
    );
}

export function getPost(db: Database, id: number): Post | null {
    const posts =
        sqlite<Post>`SELECT * FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ${id}`(
            db,
            convertPost
        );

    return posts.length === 0 ? null : posts[0];
}

export function countPosts(db: Database): number {
    const results = sqlite<number>`SELECT COUNT(*) FROM posts`(
        db,
        (sqlValues) => sqlValues[0] as number
    );

    return results[0] ?? 0;
}

export function createPost(db: Database, postCreate: PostCreate): Post {
    sqlite`INSERT INTO posts (user_id, title, body) VALUES (${postCreate.user_id}, ${postCreate.title}, ${postCreate.body})`(
        db
    );

    const id = sqlite<number>`SELECT last_insert_rowid()`(
        db,
        (sqlValues) => sqlValues[0] as number
    )[0];

    const post = getPost(db, id);

    if (post === null) {
        throw new Error(`createPost: could not create post with id ${id}`);
    }

    return post;
}

export function updatePost(db: Database, postUpdate: PostUpdate): Post {
    sqlite`UPDATE posts SET user_id = COALESCE(${postUpdate.user_id}, user_id), title = COALESCE(${postUpdate.title}, title), body = COALESCE(${postUpdate.body}, body) WHERE id = ${postUpdate.id}`(
        db
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
    sqlite`DELETE FROM posts WHERE id = ${id}`(db);

    const post = getPost(db, id);

    if (post !== null) {
        throw new Error(`deletePost: could not delete post with id ${id}`);
    }

    return id;
}

export function convertPost(sqlValues: SqlValue[]): Post {
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
