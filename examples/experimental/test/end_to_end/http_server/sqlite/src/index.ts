import {
    init,
    postUpgrade,
    preUpgrade,
    StableBTreeMap,
    stableJson
} from 'azle';
import { Server } from 'azle/experimental';
import express from 'express';
import { Database } from 'sql.js/dist/sql-asm.js';

import { initDb } from './db';
import { getRouter as getRouterPosts } from './entities/posts/router';
import { getRouter as getRouterUsers } from './entities/users/router';

export let db: Database;

let stableDbMap = new StableBTreeMap<'DATABASE', Uint8Array>(0, stableJson, {
    toBytes: (data: Uint8Array): Uint8Array => data,
    fromBytes: (bytes): Uint8Array => bytes
});

export default class extends Server {
    constructor() {
        super();

        let app = express();

        app.use(express.json());

        app.use('/users', getRouterUsers());
        app.use('/posts', getRouterPosts());

        app.get('/init-called', (_req, res) => {
            res.json(globalThis._azleInitCalled);
        });

        app.get('/post-upgrade-called', (_req, res) => {
            res.json(globalThis._azlePostUpgradeCalled);
        });

        this.nodeServer = app.listen();
    }

    @init
    async init(): Promise<void> {
        db = await initDb();
    }

    @preUpgrade
    preUpgrade(): void {
        stableDbMap.insert('DATABASE', db.export());
    }

    @postUpgrade
    async postUpgrade(): Promise<void> {
        const database = stableDbMap.get('DATABASE');

        if (database === null) {
            throw new Error('Failed to get database');
        }

        db = await initDb(database);
    }
}
