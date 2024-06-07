import { count, eq } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { DrizzleDb } from '../../db';
import { User, Users } from '../users/db';

export const Posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    user_id: integer('user_id')
        .notNull()
        .references(() => Users.id)
});
export type Post = Omit<typeof Posts.$inferSelect, 'user_id'> & { user: User };
export type PostCreate = Omit<typeof Posts.$inferInsert, 'id'>;
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

    return results.length === 0
        ? null
        : {
              id: results[0].posts.id,
              title: results[0].posts.title,
              body: results[0].posts.body,
              user: results[0].users
          };
}

export async function countPosts(drizzleDb: DrizzleDb): Promise<number> {
    const results = await drizzleDb
        .select({
            count: count()
        })
        .from(Posts);

    return results[0]?.count ?? 0;
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
        throw new Error(
            `createPost: could not create post with id ${result.id}`
        );
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
    const posts = await drizzleDb
        .delete(Posts)
        .where(eq(Posts.id, id))
        .returning({
            id: Posts.id
        });
    const post = posts[0];

    if (post === undefined) {
        throw new Error(`deletePost: could not delete post with id ${id}`);
    }

    return post.id;
}
