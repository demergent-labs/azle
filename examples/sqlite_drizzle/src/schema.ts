import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username').unique(),
    age: integer('age')
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
