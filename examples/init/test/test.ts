import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/init';
import { get_tests } from './tests';

const init_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy(
        'init',
        `'(record { id = "0" }, variant { Fire }, principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'`
    ),
    ...get_tests(init_canister)
];

run_tests(tests);
