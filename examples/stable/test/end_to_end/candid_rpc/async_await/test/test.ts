import { getTests } from '@azle/async_await_end_to_end_test_functional_syntax/test/tests';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/async_await';

const canisterName = 'async_await';
const asyncAwaitCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(asyncAwaitCanister));
