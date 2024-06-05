import { describe } from '@jest/globals';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor as createComplexActor } from '../test/dfx_generated/complex_init';
// @ts-ignore
import { createActor as createRecActor } from '../test/dfx_generated/rec_init';
import { getRecTests, getTests } from './tests';

const complexInitCanister = createComplexActor(getCanisterId('complex_init'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const recInitCanister = createRecActor(getCanisterId('rec_init'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests('complex_init', () => {
    describe('complex init canister', getTests(complexInitCanister));
    describe('rec init canister', getRecTests(recInitCanister));
});
