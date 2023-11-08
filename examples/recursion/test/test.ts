import { getCanisterId, runTests } from 'azle/test';
// @ts-ignore
import { createActor } from './dfx_generated/recursion';
// @ts-ignore
import { createActor as createRecursiveActor } from './dfx_generated/recursive_canister';
import { getRecursiveCanisterTests, getTests } from './tests';

const recursionCanister = createActor(getCanisterId('recursion'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const recursiveCanister = createRecursiveActor(
    getCanisterId('recursive_canister'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests([
    ...getTests(recursionCanister),
    ...getRecursiveCanisterTests(recursiveCanister)
]);
