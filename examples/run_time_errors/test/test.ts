import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/run_time_errors';
import { get_tests } from './tests';

const error_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('run_time_errors'),
    ...get_tests(error_canister)
];

run_tests(tests);
