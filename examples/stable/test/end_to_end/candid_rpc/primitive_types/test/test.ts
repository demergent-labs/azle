import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'primitive_types_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/primitive_types';

const canisterName = 'primitive_types';
const primitiveTypesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(primitiveTypesCanister));
