import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/update';

const update_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...cleanDeploy('update'),
    {
        name: 'update',
        test: async () => {
            const result = await update_canister.update('Why hello there');

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'query',
        test: async () => {
            const result = await update_canister.query();

            return {
                ok: result === 'Why hello there'
            };
        }
    }
];

run_tests(tests);
