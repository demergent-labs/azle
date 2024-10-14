// TODO this needs to be more thoroughly tested

import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/complex_types';
import { getTests } from './tests';

const canisterName = 'complex_types';
const complexTypesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(complexTypesCanister), canisterName);
