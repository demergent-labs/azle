# Databases

The eventual goal for Azle is to support as many database solutions as possible. This is difficult for a number of reasons related to ICP's decentralized computing paradigm and Wasm environment.

[SQLite](https://sqlite.org/) is the current recommended approach to databases with Azle. We plan to provide Postgres support through [pglite](https://github.com/electric-sql/pglite) next.

Azle has good support for SQLite through [sql.js](https://www.npmjs.com/package/sql.js). It also has good support for ORMs like [Drizzle](https://orm.drizzle.team/) and [TypeORM](https://typeorm.io/) using `sql.js`.

The following examples should be very useful as you get started using SQLite in Azle:

Examples:

-   [sqlite](https://github.com/demergent-labs/azle/tree/main/examples/sqlite)
-   [sqlite_drizzle](https://github.com/demergent-labs/azle/tree/main/examples/sqlite_drizzle)
-   [sqlite_typeorm](https://github.com/demergent-labs/azle/tree/main/examples/sqlite_typeorm)

## sql.js

SQLite in Azle works using an [asm.js](https://en.wikipedia.org/wiki/Asm.js) build of SQLite from `sql.js` without modifications to the library. The database is stored entirely in memory on the heap, giving you ~2 GiB of space. Serialization across upgrades is possible using stable memory like this:

```typescript
// src/index.its

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
```

```typescript
// src/db/index.ts

import initSqlJs, {
    Database,
    QueryExecResult,
    SqlValue
} from 'sql.js/dist/sql-asm.js';

import { migrations } from './migrations';

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
```
