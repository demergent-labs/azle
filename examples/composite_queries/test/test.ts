import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/canister1';
import { get_tests } from './tests';

const canister1 = createActor(getCanisterId('canister1'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(canister1));
