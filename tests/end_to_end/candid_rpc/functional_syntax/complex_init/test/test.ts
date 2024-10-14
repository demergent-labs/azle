import { describe } from '@jest/globals';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor as createComplexActor } from './dfx_generated/complex_init';
import { createActor as createRecActor } from './dfx_generated/rec_init';
import { getRecTests, getTests } from './tests';

const complexInitCanisterName = 'complex_init';
const complexInitCanister = createComplexActor(
    getCanisterId(complexInitCanisterName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const recInitCanisterName = 'rec_init';
const recInitCanister = createRecActor(getCanisterId(recInitCanisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(() => {
    describe('complex init canister', getTests(complexInitCanister));
    describe('rec init canister', getRecTests(recInitCanister));
}, complexInitCanisterName);
