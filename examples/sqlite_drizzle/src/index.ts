// TODO let's make routes for each of the User and BlogPost
// TODO do all crud for User and BlogPost

import {
    ic,
    init,
    jsonStringify,
    postUpgrade,
    preUpgrade,
    Server,
    setNodeServer,
    StableBTreeMap,
    stableJson
} from 'azle';
import { drizzle, SQLJsDatabase } from 'drizzle-orm/sql-js';
import express, { Request } from 'express';
import initSqlJs, { Database } from 'sql.js/dist/sql-asm.js';
import { v4 } from 'uuid';

import { migrations } from './migrations';
import * as schema from './schema';
import { countUsers, createUser, getUser, getUsers } from './users';

export type DrizzleDb = SQLJsDatabase<typeof schema>;

let db: Database;
let drizzleDb: DrizzleDb;
let initState: boolean = false;
let postUpgradeState: boolean = false;

const sqlSerializable = {
    toBytes: (data: Uint8Array) => data,
    fromBytes: (bytes: Uint8Array) => bytes
};

let stableMap = StableBTreeMap<'DATABASE', Uint8Array>(
    0,
    stableJson,
    sqlSerializable
);

// TODO maybe add a param to init and post upgrade to seed the database
// TODO with a certain number of records...

// TODO oooh...we could chunk the pre and post upgrade I think with timers
// TODO hmmm...could we though?
export default Server(initServer, {
    init: init([], async () => {
        console.log('init running');

        initState = true;

        db = await initDb();
        drizzleDb = drizzle(db, { schema });

        setNodeServer(initServer());
    }),
    preUpgrade: preUpgrade(() => {
        console.log('pre upgrade running');

        const start = ic.instructionCounter();

        const bytes = db.export();

        stableMap.insert('DATABASE', bytes);

        const end = ic.instructionCounter();

        const instructions = Number(end - start);

        console.log('instructions', instructions);
        console.log(`bytes: ${(bytes.length / 1_000_000).toFixed(2)} MB`);

        console.log(
            `instructions capacity: ${(
                (instructions / 100_000_000_000) *
                100
            ).toFixed(2)}%`
        );
        console.log(
            `bytes capacity: ${((bytes.length / 2_000_000_000) * 100).toFixed(
                2
            )}%`
        );
        console.log();
    }),
    postUpgrade: postUpgrade([], async () => {
        console.log('post upgrade running');

        postUpgradeState = true;

        const start = ic.instructionCounter();

        const bytesOpt = stableMap.get('DATABASE');
        const bytes = bytesOpt.Some as Uint8Array;

        db = await initDb(bytes);
        drizzleDb = drizzle(db, { schema });

        setNodeServer(initServer());

        const end = ic.instructionCounter();

        const instructions = Number(end - start);

        console.log('instructions', instructions);
        console.log(`bytes: ${(bytes.length / 1_000_000).toFixed(2)} MB`);

        console.log(
            `instructions capacity: ${(
                (instructions / 100_000_000_000) *
                100
            ).toFixed(2)}%`
        );
        console.log(
            `bytes capacity: ${((bytes.length / 2_000_000_000) * 100).toFixed(
                2
            )}%`
        );
        console.log();
        console.log();
    })
});

async function initDb(
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

function initServer() {
    let app = express();

    app.use(express.json());

    app.get('/init-state', (req, res) => {
        res.json(initState);
    });

    app.get('/post-upgrade-state', (req, res) => {
        res.json(postUpgradeState);
    });

    app.get(
        '/users',
        async (
            req: Request<any, any, any, { limit?: string; offset?: string }>,
            res
        ) => {
            try {
                const limit = Number(req.query.limit ?? -1);
                const offset = Number(req.query.offset ?? 0);

                const users = await getUsers(drizzleDb, limit, offset);

                res.json(users);
            } catch (error) {
                console.log(error);
            }
        }
    );

    app.get('/users/count', async (_req, res) => {
        const count = await countUsers(drizzleDb);

        res.json(count);
    });

    app.get('/users/:id', async (req, res) => {
        const { id } = req.params;

        const user = await getUser(drizzleDb, Number(id));

        res.json(user);
    });

    app.post(
        '/users',
        async (
            req: Request<any, any, { username: string; age: number }>,
            res
        ) => {
            const { username, age } = req.body;

            const user = await createUser(drizzleDb, {
                username,
                age
            });

            res.json(user);
        }
    );

    app.post('/users/batch/:num', async (req, res) => {
        try {
            const start = ic.instructionCounter();

            const num = Number(req.params.num);

            for (let i = 0; i < Number(req.params.num); i++) {
                await createUser(drizzleDb, {
                    username: `lastmjs${v4()}`,
                    age: i
                });
            }

            const end = ic.instructionCounter();

            res.send(
                jsonStringify({
                    Success: `${num} users created`,
                    instructions: end - start
                })
            );
        } catch (error) {
            console.log('error', error);
        }
    });

    // TODO also do put and patch

    return app.listen();
}
