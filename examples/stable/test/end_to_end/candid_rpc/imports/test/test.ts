import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'imports_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/imports';

const canisterName = 'imports';
const importsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(importsCanister), canisterName);
