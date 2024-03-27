import { runTests } from 'azle/test';
import { getCanisterId } from 'azle/dfx';
import { createActor } from './dfx_generated/bytes_canister';
import { get_tests } from './tests';

const bytesCanister = createActor(getCanisterId('bytes_canister'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(bytesCanister));
