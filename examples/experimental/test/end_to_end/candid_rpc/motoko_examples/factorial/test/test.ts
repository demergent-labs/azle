import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

// @ts-ignore
import { createActor } from './dfx_generated/factorial';
import { getTests } from './tests';

const canisterName = 'factorial';
const factorialCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(factorialCanister));
