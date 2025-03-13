import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/whoami';
import { callingIdentity, canisterId, getTests } from './tests';

const canisterName = 'whoami';
const whoamiCanister = createActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true,

        identity: callingIdentity
    }
});

runTests(getTests(whoamiCanister, canisterName));
