import { describe } from '@jest/globals';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import {
    getRecTests,
    getTests
} from 'complex_init_end_to_end_test_functional_syntax/test/tests';

import { createActor as createComplexActor } from './dfx_generated/complex_init';
// @ts-ignore
import { createActor as createRecActor } from './dfx_generated/rec_init';

const complexInitCanisterName = 'complex_init';
const complexInitCanister = createComplexActor(
    getCanisterId(complexInitCanisterName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:4943',
            shouldFetchRootKey: true
        }
    }
);

const recInitCanisterName = 'rec_init';
const recInitCanister = createRecActor(getCanisterId(recInitCanisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(() => {
    describe('complex init canister', getTests(complexInitCanister));
    describe('rec init canister', getRecTests(recInitCanister));
});
