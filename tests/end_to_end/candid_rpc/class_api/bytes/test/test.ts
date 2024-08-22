import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'bytes_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/bytes_canister';

const bytesCanister = createActor(getCanisterId('bytes_canister'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(bytesCanister));
