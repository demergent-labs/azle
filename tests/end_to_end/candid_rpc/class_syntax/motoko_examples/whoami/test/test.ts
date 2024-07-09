import { runTests } from 'azle/test';
import {
    callingIdentity,
    canisterId,
    getTests
} from 'whoami_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/whoami';

const whoamiCanister = createActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        identity: callingIdentity
    }
});

runTests(getTests(whoamiCanister, 'whoami'));
