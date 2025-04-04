import { runTests } from 'azle/_internal/test';
import {
    callingIdentity,
    canisterId,
    getTests
} from 'whoami_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/whoami';

const canisterName = 'whoami';
const whoamiCanister = createActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true,

        identity: callingIdentity
    }
});

runTests(getTests(whoamiCanister, canisterName));
