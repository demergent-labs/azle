// TODO this should really be with user in the db.ts

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username').unique().notNull(),
    age: integer('age').notNull()
});
export type User = typeof users.$inferSelect;
export type UserCreate = Omit<User, 'id'>;
export type UserUpdate = Pick<User, 'id'> & Partial<UserCreate>;

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    user_id: integer('user_id')
        .notNull()
        .references(() => users.id)
});
export type Post = Omit<typeof posts.$inferSelect, 'user_id'> & { user: User };
export type PostCreate = typeof posts.$inferInsert;
export type PostUpdate = Pick<Post, 'id'> & Partial<PostCreate>;
