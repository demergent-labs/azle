import { runTests } from 'azle/test';
import { createActor } from './dfx_generated/async_await';
import { get_tests } from './tests';

const async_await_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(async_await_canister));
