import { desc, eq } from 'drizzle-orm';

import { DrizzleDb } from '../../db';
import { User, UserCreate, users, UserUpdate } from '../../db/schema';

export async function getUsers(
    db: DrizzleDb,
    limit: number,
    offset: number
): Promise<User[]> {
    return await db.select().from(users).limit(limit).offset(offset);
}

export async function getUser(
    drizzleDb: DrizzleDb,
    id: number
): Promise<User | null> {
    const results = await drizzleDb
        .select()
        .from(users)
        .where(eq(users.id, id));

    if (results.length === 0) {
        return null;
    } else {
        return results[0];
    }
}

export async function countUsers(drizzleDb: DrizzleDb): Promise<number> {
    const results = await drizzleDb
        .select({
            id: users.id
        })
        .from(users)
        .orderBy(desc(users.id))
        .limit(1);

    if (results.length === 0) {
        return 0;
    } else {
        return results[0].id;
    }
}

export async function createUser(
    drizzleDb: DrizzleDb,
    userCreate: UserCreate
): Promise<User> {
    const results = await drizzleDb
        .insert(users)
        .values(userCreate)
        .returning();

    const user = results[0];

    if (user === undefined) {
        throw new Error(`createUser failed`);
    }

    return user;
}

export async function updateUser(
    drizzleDb: DrizzleDb,
    userUpdate: UserUpdate
): Promise<User> {
    const results = await drizzleDb
        .update(users)
        .set(userUpdate)
        .where(eq(users.id, userUpdate.id))
        .returning();
    const user = results[0];

    if (user === undefined) {
        throw new Error(`updateUser failed for id ${userUpdate.id}`);
    }

    return user;
}

export async function deleteUser(
    drizzleDb: DrizzleDb,
    id: number
): Promise<number> {
    const results = await drizzleDb
        .delete(users)
        .where(eq(users.id, id))
        .returning({
            id: users.id
        });
    const user = results[0];

    if (user === undefined) {
        throw new Error(`deleteUser failed for id ${id}`);
    }

    return user.id;
}
