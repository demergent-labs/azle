import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'composite_queries_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/canister1';

const canisterName = 'canister1';
const canister1 = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(canister1));
