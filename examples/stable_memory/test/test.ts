import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/stable_memory';
import { get_tests } from './tests';

const stable_memory_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('stable_memory'),
    ...get_tests(stable_memory_canister)
];

run_tests(tests);
