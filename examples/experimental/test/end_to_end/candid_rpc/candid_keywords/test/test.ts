import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/candid_keywords';
import { getTests } from './tests';

const canisterName = 'candid_keywords';
const queryCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(queryCanister), canisterName);
