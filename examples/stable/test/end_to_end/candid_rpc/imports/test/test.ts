import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'imports_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/imports';

const canisterName = 'imports';
const importsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(importsCanister));
