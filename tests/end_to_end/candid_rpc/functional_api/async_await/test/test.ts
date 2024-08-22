import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/async_await';
import { getTests } from './tests';

const asyncAwaitCanister = createActor(getCanisterId('async_await'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(asyncAwaitCanister));
