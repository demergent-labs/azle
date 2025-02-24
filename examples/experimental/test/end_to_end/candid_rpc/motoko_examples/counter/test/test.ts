import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

// @ts-ignore
import { createActor } from './dfx_generated/counter';
import { getTests } from './tests';

const canisterName = 'counter';
const counterCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(counterCanister), canisterName);
