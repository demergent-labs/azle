import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/stable_storage';
import { get_tests } from './tests';

const stable_storage_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('stable_storage'),
    ...get_tests(stable_storage_canister)
];

run_tests(tests);
