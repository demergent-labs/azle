import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

// @ts-ignore
import { createActor } from './dfx_generated/echo';
import { getTests } from './tests';

const canisterName = 'echo';
const echoCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(echoCanister), canisterName);
