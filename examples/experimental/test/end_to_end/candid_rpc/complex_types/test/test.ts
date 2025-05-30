// TODO this needs to be more thoroughly tested

import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/complex_types';
import { getTests } from './tests';

const canisterName = 'complex_types';
const complexTypesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(complexTypesCanister));
