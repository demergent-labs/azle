import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/tuple_types';
import { getTests } from './tests';

const canisterName = 'tuple_types';
const tupleTypesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(tupleTypesCanister), canisterName);
