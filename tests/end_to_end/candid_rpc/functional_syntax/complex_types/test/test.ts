// TODO this needs to be more thoroughly tested

import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/complex_types';
import { getTests } from './tests';

const complexTypesCanister = createActor(getCanisterId('complex_types'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(complexTypesCanister));
