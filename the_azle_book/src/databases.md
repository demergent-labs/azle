# Databases

The eventual goal for Azle is to support as many database solutions as possible. This is difficult for a number of reasons related to ICP's decentralized computing paradigm and Wasm environment.

<a href="https://sqlite.org/" target="_blank">SQLite</a> is the current recommended approach to databases with Azle. We plan to provide Postgres support through <a href="https://github.com/electric-sql/pglite" target="_blank">pglite</a> next.

Azle has good support for SQLite through <a href="https://www.npmjs.com/package/sql.js" target="_blank">sql.js</a>. It also has good support for ORMs like <a href="https://orm.drizzle.team/" target="_blank">Drizzle</a> and <a href="https://typeorm.io/" target="_blank">TypeORM</a> using `sql.js`.

The following examples should be very useful as you get started using SQLite in Azle:

Examples:

- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/sqlite" target="_blank">sqlite</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/sqlite_drizzle" target="_blank">sqlite_drizzle</a>
- <a href="https://github.com/demergent-labs/azle/tree/main/examples/experimental/test/end_to_end/http_server/sqlite_typeorm" target="_blank">sqlite_typeorm</a>

## sql.js

SQLite in Azle works using an <a href="https://en.wikipedia.org/wiki/Asm.js" target="_blank">asm.js</a> build of SQLite from `sql.js` without modifications to the library. The database is stored entirely in memory on the heap, giving you ~2 GiB of space. Serialization across upgrades is possible using stable memory like this:

```typescript
// src/index.its

import {
    init,
    postUpgrade,
    preUpgrade,
    Server,
    StableBTreeMap,
    stableJson
} from 'azle/experimental';
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
