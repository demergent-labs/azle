import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/async_await';
import { get_tests } from './tests';

const async_await_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('async_await'),
    ...get_tests(async_await_canister)
];

run_tests(tests);
