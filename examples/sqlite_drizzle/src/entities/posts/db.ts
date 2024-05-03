// TODO write a converter

import { desc, eq } from 'drizzle-orm';

import { DrizzleDb } from '../../db';
import { Post, PostCreate, posts, PostUpdate, users } from '../../db/schema';

export async function getPosts(
    db: DrizzleDb,
    limit: number,
    offset: number
): Promise<Post[]> {
    const results = await db
        .select()
        .from(posts)
        .innerJoin(users, eq(posts.user_id, users.id))
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
        .from(posts)
        .innerJoin(users, eq(posts.user_id, users.id))
        .where(eq(posts.id, id));
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
            id: posts.id
        })
        .from(posts)
        .orderBy(desc(posts.id))
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
    const results = await drizzleDb.insert(posts).values(postCreate).returning({
        id: posts.id
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
        .update(posts)
        .set(postUpdate)
        .where(eq(posts.id, postUpdate.id))
        .returning({
            id: posts.id
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
        .delete(posts)
        .where(eq(posts.id, id))
        .returning({
            id: posts.id
        });
    const post = results[0];

    if (post === undefined) {
        throw new Error(`deletePost failed for id ${id}`);
    }

    return post.id;
}
