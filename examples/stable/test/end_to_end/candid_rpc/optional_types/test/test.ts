import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'optional_types_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/optional_types';

const canisterName = 'optional_types';
const optionalTypesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(optionalTypesCanister));
