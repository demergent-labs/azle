import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/principal';
import { get_tests } from './tests';

const principal_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('principal'),
    ...get_tests(principal_canister)
];

run_tests(tests);
