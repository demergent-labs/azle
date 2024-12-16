import { SQLJsDatabase } from 'drizzle-orm/sql-js';
import initSqlJs, { Database } from 'sql.js/dist/sql-asm.js';

import { migrations } from './migrations';
import * as schema from './schema';

export type DrizzleDb = SQLJsDatabase<typeof schema>;

export async function initDb(
    bytes: Uint8Array = Uint8Array.from([])
): Promise<Database> {
    const SQL = await initSqlJs({});

    let db = new SQL.Database(bytes);

    if (bytes.length === 0) {
        for (const migration of migrations) {
            db.run(migration);
        }
    }

    return db;
}
