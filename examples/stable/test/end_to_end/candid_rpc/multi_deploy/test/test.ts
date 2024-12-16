import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/multi_deploy';
import { getTests } from './tests';

const canister = createActor(getCanisterId('multi_deploy'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(canister));
