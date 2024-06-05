import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from './dfx_generated/canister1';
import { getTests } from './tests';

const canister1 = createActor(getCanisterId('canister1'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests('composite_queries', getTests(canister1));
