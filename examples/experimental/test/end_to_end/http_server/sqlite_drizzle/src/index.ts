import {
    init,
    postUpgrade,
    preUpgrade,
    Server,
    StableBTreeMap,
    stableJson
} from 'azle/experimental';
import { drizzle } from 'drizzle-orm/sql-js';
import { Database } from 'sql.js/dist/sql-asm.js';

import { DrizzleDb, initDb } from './db';
import * as schema from './db/schema';
import { initServer } from './server';

let db: Database;
export let drizzleDb: DrizzleDb;

let stableDbMap = StableBTreeMap<'DATABASE', Uint8Array>(0, stableJson, {
    toBytes: (data: Uint8Array) => data,
    fromBytes: (bytes: Uint8Array) => bytes
});

export default Server(initServer, {
    init: init([], async () => {
        db = await initDb();
        drizzleDb = drizzle(db, { schema });
    }),
    preUpgrade: preUpgrade(() => {
        stableDbMap.insert('DATABASE', db.export());
    }),
    postUpgrade: postUpgrade([], async () => {
        const database = stableDbMap.get('DATABASE');
        if (database === null) {
            throw new Error('Failed to get database');
        }
        db = await initDb(database);
        drizzleDb = drizzle(db, { schema });
    })
});
