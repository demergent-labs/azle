import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'canister_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/canister';

const canisterName = 'canister';
const canister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(canister), canisterName);
