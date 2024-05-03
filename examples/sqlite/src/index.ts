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

export let db: Database;

let stableDbMap = StableBTreeMap<'DATABASE', Uint8Array>(0, stableJson, {
    toBytes: (data: Uint8Array) => data,
    fromBytes: (bytes: Uint8Array) => bytes
});

export let initState: {
    value: boolean;
} = {
    value: false
};

export let postUpgradeState: {
    value: boolean;
} = {
    value: false
};

export default Server(initServer, {
    init: init([], async () => {
        initState.value = true;

        db = await initDb();
    }),
    preUpgrade: preUpgrade(() => {
        stableDbMap.insert('DATABASE', db.export());
    }),
    postUpgrade: postUpgrade([], async () => {
        postUpgradeState.value = true;

        const bytesOpt = stableDbMap.get('DATABASE');
        const bytes = bytesOpt.Some as Uint8Array;

        db = await initDb(bytes);
    })
});
