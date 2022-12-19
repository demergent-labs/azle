import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/stable_structures';
import { get_tests } from './tests';

const stable_structures_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('stable_structures'),
    ...get_tests(stable_structures_canister)
];

run_tests(tests);
