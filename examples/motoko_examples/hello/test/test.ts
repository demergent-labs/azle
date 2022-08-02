import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle';

const hello_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'greet',
        test: async () => {
            const result = await hello_canister.greet('everyone');

            return {
                ok: result === 'Hello, everyone!'
            };
        }
    },
    {
        name: 'greet nobody',
        test: async () => {
            const result = await hello_canister.greet('');

            return {
                ok: result === 'Hello, !'
            };
        }
    }
];

run_tests(tests);
