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
import express, { Request } from 'express';
import initSqlJs, { Database } from 'sql.js/dist/sql-asm.js';
import { v4 } from 'uuid';

import { countUsers, createUser, getUser, getUsers } from './users';

let db: Database;
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

    if (bytes.length !== 0) {
        return db;
    }

    db.run(`
        CREATE TABLE users
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                age INTEGER NOT NULL
            );
    `);

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
        (
            req: Request<any, any, any, { limit?: string; offset?: string }>,
            res
        ) => {
            try {
                const limit = Number(req.query.limit ?? -1);
                const offset = Number(req.query.offset ?? 0);

                const users = getUsers(db, limit, offset);

                res.json(users);
            } catch (error) {
                console.log(error);
            }
        }
    );

    app.get('/users/count', (req, res) => {
        res.json(countUsers(db));
    });

    app.get('/users/:id', (req, res) => {
        const { id } = req.params;

        const user = getUser(db, Number(id));

        res.json(user);
    });

    app.post(
        '/users',
        (req: Request<any, any, { username: string; age: number }>, res) => {
            const { username, age } = req.body;

            const id = createUser(db, {
                username,
                age
            });

            res.json(id);
        }
    );

    app.post('/users/batch/:num', (req, res) => {
        try {
            const start = ic.instructionCounter();

            const num = Number(req.params.num);

            for (let i = 0; i < Number(req.params.num); i++) {
                createUser(db, {
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
