import {
    init,
    postUpgrade,
    preUpgrade,
    Server,
    StableBTreeMap,
    stableJson
} from 'azle';
import { Database } from 'sql.js/dist/sql-asm.js';

import { initDb } from './db';
import { initServer } from './server';

let db: Database;

let stableDbMap = StableBTreeMap<'DATABASE', Uint8Array>(0, stableJson, {
    toBytes: (data: Uint8Array) => data,
    fromBytes: (bytes: Uint8Array) => bytes
});

export default Server(initServer, {
    init: init([], async () => {
        db = await initDb();
    }),
    preUpgrade: preUpgrade(() => {
        stableDbMap.insert('DATABASE', db.export());
    }),
    postUpgrade: postUpgrade([], async () => {
        db = await initDb(stableDbMap.get('DATABASE').Some);
    })
});
