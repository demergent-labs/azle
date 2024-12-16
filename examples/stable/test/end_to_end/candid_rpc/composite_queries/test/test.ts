import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'composite_queries_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/canister1';

const canisterName = 'canister1';
const canister1 = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(canister1), canisterName);
