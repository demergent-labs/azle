import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/call_raw';
import { getTests } from './tests';

const canisterName = 'call_raw';
const callRawCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(callRawCanister));
