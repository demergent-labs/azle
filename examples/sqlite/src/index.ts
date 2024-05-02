// TODO let's make routes for each of the User and BlogPost
// TODO do all crud for User and BlogPost
// TODO maybe add a param to init and post upgrade to seed the database
// TODO with a certain number of records...
// TODO get rid of all random try catches

import {
    init,
    postUpgrade,
    preUpgrade,
    Server,
    setNodeServer,
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

// TODO can't we get rid of the need to do setNodeServer?
// TODO we could loop through and find the init and postUpgrade
// TODO and create another function that sets setNodeServer right?
export default Server(initServer, {
    init: init([], async () => {
        initState.value = true;

        db = await initDb();

        setNodeServer(initServer());
    }),
    preUpgrade: preUpgrade(() => {
        stableDbMap.insert('DATABASE', db.export());
    }),
    postUpgrade: postUpgrade([], async () => {
        postUpgradeState.value = true;

        const bytesOpt = stableDbMap.get('DATABASE');
        const bytes = bytesOpt.Some as Uint8Array;

        db = await initDb(bytes);

        setNodeServer(initServer());
    })
});
