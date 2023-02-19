import { run_tests } from 'azle/test';
import { createActor } from '../dfx_generated/azle';
import { callingIdentity, canisterId, get_tests } from './tests';

const whoami_canister = createActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        identity: callingIdentity
    }
});

run_tests(get_tests(whoami_canister));
