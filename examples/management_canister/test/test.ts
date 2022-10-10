import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/management_canister';
import { get_tests } from './tests';

const management_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('management_canister'),
    ...get_tests(management_canister)
];

run_tests(tests);
