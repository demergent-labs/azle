import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'optional_types_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../test/dfx_generated/optional_types';

const canisterName = 'optional_types';
const optionalTypesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(optionalTypesCanister), canisterName);
