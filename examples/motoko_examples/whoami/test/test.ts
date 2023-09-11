import { runTests } from 'azle/test';
import { createActor } from './dfx_generated/whoami';
import { callingIdentity, canisterId, getTests } from './tests';

const whoamiCanister = createActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        identity: callingIdentity
    }
});

runTests(getTests(whoamiCanister, 'whoami'));
