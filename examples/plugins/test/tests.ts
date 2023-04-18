import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/plugins/plugins.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(pluginsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'execute - create table',
            test: async () => {
                const sql = `CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, value TEXT);`;
                const result = await pluginsCanister.execute(sql);

                return 'Ok' in result ? { Ok: true } : { Ok: false };
            }
        },
        {
            name: 'execute - insert data',
            test: async () => {
                const sql = `INSERT INTO test_table (value) VALUES ('test_value');`;
                const result = await pluginsCanister.execute(sql);

                return 'Ok' in result ? { Ok: true } : { Ok: false };
            }
        },
        {
            name: 'query - select data',
            test: async () => {
                const sql = `SELECT * FROM test_table;`;
                const result = await pluginsCanister.query(sql);

                return 'Ok' in result &&
                    result.Ok.length === 1 &&
                    result.Ok[0][0] === '1' &&
                    result.Ok[0][1] === 'test_value'
                    ? { Ok: true }
                    : { Ok: false };
            }
        },
        {
            name: 'execute - update data',
            test: async () => {
                const sql = `UPDATE test_table SET value = 'updated_value' WHERE id = 1;`;
                const result = await pluginsCanister.execute(sql);

                return 'Ok' in result ? { Ok: true } : { Ok: false };
            }
        },
        {
            name: 'query - select updated data',
            test: async () => {
                const sql = `SELECT * FROM test_table WHERE id = 1;`;
                const result = await pluginsCanister.query(sql);

                return 'Ok' in result &&
                    result.Ok.length === 1 &&
                    result.Ok[0][0] === '1' &&
                    result.Ok[0][1] === 'updated_value'
                    ? { Ok: true }
                    : { Ok: false };
            }
        },
        {
            name: 'execute - delete data',
            test: async () => {
                const sql = `DELETE FROM test_table WHERE id = 1;`;
                const result = await pluginsCanister.execute(sql);

                return 'Ok' in result ? { Ok: true } : { Ok: false };
            }
        },
        {
            name: 'query - select no data',
            test: async () => {
                const sql = `SELECT * FROM test_table;`;
                const result = await pluginsCanister.query(sql);

                return 'Ok' in result && result.Ok.length === 0
                    ? { Ok: true }
                    : { Ok: false };
            }
        }
    ];
}
