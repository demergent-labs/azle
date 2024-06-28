import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/plugins/plugins.did';

export function getTests(pluginsCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('execute - create table', async () => {
            const sql = `CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, value TEXT);`;
            const result = await pluginsCanister.execute(sql);

            expect(result).toHaveProperty('Ok');
        });

        it('execute - insert data', async () => {
            const sql = `INSERT INTO test_table (value) VALUES ('test_value');`;
            const result = await pluginsCanister.execute(sql);

            expect(result).toHaveProperty('Ok');
        });

        it('query - select data', async () => {
            const sql = `SELECT * FROM test_table;`;
            const result = await pluginsCanister.query(sql);

            expect(result).toStrictEqual({ Ok: [['1', 'test_value']] });
        });

        it('execute - update data', async () => {
            const sql = `UPDATE test_table SET value = 'updated_value' WHERE id = 1;`;
            const result = await pluginsCanister.execute(sql);

            expect(result).toHaveProperty('Ok');
        });

        it('query - select updated data', async () => {
            const sql = `SELECT * FROM test_table WHERE id = 1;`;
            const result = await pluginsCanister.query(sql);

            expect(result).toStrictEqual({ Ok: [['1', 'updated_value']] });
        });

        it('execute - delete data', async () => {
            const sql = `DELETE FROM test_table WHERE id = 1;`;
            const result = await pluginsCanister.execute(sql);

            expect(result).toHaveProperty('Ok');
        });

        it('query - select no data', async () => {
            const sql = `SELECT * FROM test_table;`;
            const result = await pluginsCanister.query(sql);

            expect(result).toHaveProperty('Ok');
            expect(result.Ok).toHaveLength(0);
        });
    };
}
