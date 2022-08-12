import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle/';

const todo_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'name',
        test: async () => {
            return {
                ok: true
            };
        }
    }
];

run_tests(tests);
