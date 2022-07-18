import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/query';

const query_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...cleanDeploy('query'),
    {
        name: 'query',
        test: async () => {
            const result = await query_canister.query();

            return {
                ok: result === 'This is a query function'
            };
        }
    }
];

run_tests(tests);
