import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle';

const query_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'query',
        test: async () => {
            const result = await query_canister.simple_query();

            return {
                ok: result === 'This is a query function'
            };
        }
    }
];

run_tests(tests);
