import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../dfx_generated/azle/';
import { get_tests } from './tests';

const blob_canister = createActor(getCanisterId('azle'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(blob_canister));
