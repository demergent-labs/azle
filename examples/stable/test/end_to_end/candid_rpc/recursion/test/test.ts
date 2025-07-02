import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/recursion';
import { createActor as createRecursiveActor } from './dfx_generated/recursive_canister';
import { getRecursiveCanisterTests, getTests } from './tests';

const canisterName = 'recursion';
const recursiveCanisterName = 'recursive_canister';

const recursionCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

const recursiveCanister = createRecursiveActor(
    getCanisterId(recursiveCanisterName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:4943',
            shouldFetchRootKey: true
        }
    }
);

runTests(() => {
    getTests(recursionCanister)();
    getRecursiveCanisterTests(recursiveCanister)();
});
