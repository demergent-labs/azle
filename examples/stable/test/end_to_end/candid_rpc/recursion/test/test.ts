import { describe } from '@jest/globals';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import {
    getRecursiveCanisterTests,
    getTests
} from 'recursion_end_to_end_test_functional_syntax/test/tests';

// @ts-ignore
import { createActor } from './dfx_generated/recursion';
// @ts-ignore
import { createActor as createRecursiveActor } from './dfx_generated/recursive_canister';

const canisterName = 'recursion';
const recursiveCanisterName = 'recursive_canister';

const recursionCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

const recursiveCanister = createRecursiveActor(
    getCanisterId(recursiveCanisterName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000',
            shouldFetchRootKey: true
        }
    }
);

runTests(() => {
    describe('getTests', getTests(recursionCanister));
    describe(
        'getRecursiveCanisterTests',
        getRecursiveCanisterTests(recursiveCanister)
    );
}, [canisterName, recursiveCanisterName]);
