import { runTests } from 'azle/test';
import { createActor } from '../dfx_generated/azle';
import { callingIdentity, canisterId, getTests } from './tests';

const whoami_canister = createActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        identity: callingIdentity
    }
});

runTests(getTests(whoami_canister, 'azle'));
