// TODO write a converter

import { desc, eq } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { DrizzleDb } from '../../db';
import { User, Users } from '../users/db';

// TODO figure out better types
export const Posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    user_id: integer('user_id')
        .notNull()
        .references(() => Users.id)
});
export type Post = Omit<typeof Posts.$inferSelect, 'user_id'> & { user: User };
export type PostCreate = typeof Posts.$inferInsert;
export type PostUpdate = Pick<Post, 'id'> & Partial<PostCreate>;

export async function getPosts(
    db: DrizzleDb,
    limit: number,
    offset: number
): Promise<Post[]> {
    const results = await db
        .select()
        .from(Posts)
        .innerJoin(Users, eq(Posts.user_id, Users.id))
        .limit(limit)
        .offset(offset);

    return results.map((result) => {
        return {
            id: result.posts.id,
            title: result.posts.title,
            body: result.posts.body,
            user: result.users
        };
    });
}

export async function getPost(
    drizzleDb: DrizzleDb,
    id: number
): Promise<Post | null> {
    const results = await drizzleDb
        .select()
        .from(Posts)
        .innerJoin(Users, eq(Posts.user_id, Users.id))
        .where(eq(Posts.id, id));
    const result = results[0];

    if (result === undefined) {
        return null;
    } else {
        return {
            id: result.posts.id,
            title: result.posts.title,
            body: result.posts.body,
            user: result.users
        };
    }
}

export async function countPosts(drizzleDb: DrizzleDb): Promise<number> {
    const results = await drizzleDb
        .select({
            id: Posts.id
        })
        .from(Posts)
        .orderBy(desc(Posts.id))
        .limit(1);

    if (results.length === 0) {
        return 0;
    } else {
        return results[0].id;
    }
}

export async function createPost(
    drizzleDb: DrizzleDb,
    postCreate: PostCreate
): Promise<Post> {
    const results = await drizzleDb.insert(Posts).values(postCreate).returning({
        id: Posts.id
    });
    const result = results[0];

    const post = await getPost(drizzleDb, result.id);

    if (post === null) {
        throw new Error(`createPost: could not post with id ${result.id}`);
    }

    return post;
}

export async function updatePost(
    drizzleDb: DrizzleDb,
    postUpdate: PostUpdate
): Promise<Post> {
    const results = await drizzleDb
        .update(Posts)
        .set(postUpdate)
        .where(eq(Posts.id, postUpdate.id))
        .returning({
            id: Posts.id
        });
    const result = results[0];

    const post = await getPost(drizzleDb, result.id);

    if (post === null) {
        throw new Error(
            `updatePost: could not find post with id ${postUpdate.id}`
        );
    }

    return post;
}

export async function deletePost(
    drizzleDb: DrizzleDb,
    id: number
): Promise<number> {
    const results = await drizzleDb
        .delete(Posts)
        .where(eq(Posts.id, id))
        .returning({
            id: Posts.id
        });
    const post = results[0];

    if (post === undefined) {
        throw new Error(`deletePost failed for id ${id}`);
    }

    return post.id;
}
