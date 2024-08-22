import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'candid_encoding_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/candid_encoding';

const candidEncodingCanister = createActor(getCanisterId('candid_encoding'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(candidEncodingCanister));
