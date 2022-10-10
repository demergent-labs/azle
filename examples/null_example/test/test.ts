import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/null_example';
import { get_tests } from './tests';

const null_example_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('null_example'),
    ...get_tests(null_example_canister)
];

run_tests(tests);
