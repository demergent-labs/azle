import { describe } from '@jest/globals';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

// @ts-ignore
import { createActor } from './dfx_generated/recursion';
// @ts-ignore
import { createActor as createRecursiveActor } from './dfx_generated/recursive_canister';
import { getRecursiveCanisterTests, getTests } from './tests';

const recursionName = 'recursion';
const recursionCanister = createActor(getCanisterId(recursionName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

const recursiveCanisterName = 'recursive_canister';
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
    describe('recursive tests', getTests(recursionCanister));
    describe(
        'recursive canister tests',
        getRecursiveCanisterTests(recursiveCanister)
    );
});
