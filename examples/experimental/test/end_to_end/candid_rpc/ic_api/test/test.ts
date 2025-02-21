import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/ic_api';
import { getTests } from './tests';

const canisterName = 'ic_api';
const icApiCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(icApiCanister as any), canisterName);
