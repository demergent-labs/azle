import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/init';
import { getTests } from './tests';

const init_canister = createActor(getCanisterId('init'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(init_canister));
