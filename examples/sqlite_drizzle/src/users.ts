import { desc, eq } from 'drizzle-orm';

import { DrizzleDb } from '.';
import { NewUser, User, users } from './schema';

export async function getUsers(
    db: DrizzleDb,
    limit: number,
    offset: number
): Promise<User[]> {
    return await db.select().from(users).limit(limit).offset(offset);
}

export async function getUser(db: DrizzleDb, id: number): Promise<User | null> {
    const results = await db.select().from(users).where(eq(users.id, id));

    if (results.length === 0) {
        return null;
    } else {
        return results[0];
    }
}

export async function countUsers(db: DrizzleDb): Promise<number> {
    const results = await db
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
    db: DrizzleDb,
    newUser: NewUser
): Promise<User | null> {
    const results = await db.insert(users).values(newUser).returning();

    if (results.length === 0) {
        return null;
    } else {
        return results[0];
    }
}
