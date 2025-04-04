import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'func_types_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/func_types';

const canisterName = 'func_types';
const funcTypesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(funcTypesCanister));
