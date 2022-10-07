import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/compiler_errors';

const error_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('compiler_errors'),
    {
        name: 'blank test',
        test: async () => {
            return {
                ok: true
            };
        }
    }
];

run_tests(tests);
