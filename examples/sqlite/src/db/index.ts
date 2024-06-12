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

export function sqlite<T>(strings: TemplateStringsArray, ...values: any[]) {
    return (db: Database, converter?: (sqlValues: SqlValue[]) => T): T[] => {
        const parameterizedQuery = strings.reduce((acc, string, index) => {
            return `${acc}${string}${index !== strings.length - 1 ? '?' : ''}`;
        }, '');

        const valuesNullized = values.map((value) => value ?? null);

        const queryExecResults = db.exec(parameterizedQuery, valuesNullized);

        const queryExecResult = queryExecResults[0] as
            | QueryExecResult
            | undefined;

        if (queryExecResult === undefined || converter === undefined) {
            return [];
        } else {
            return queryExecResult.values.map((sqlValues) => {
                return converter(sqlValues);
            });
        }
    };
}
