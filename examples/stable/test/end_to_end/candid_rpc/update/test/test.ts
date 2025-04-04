import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'update_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/update';

const canisterName = 'update';
const updateCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(updateCanister));
