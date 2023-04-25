import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/management_canister';
import { getTests } from './tests';

const management_canister = createActor(getCanisterId('management_canister'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(management_canister));
