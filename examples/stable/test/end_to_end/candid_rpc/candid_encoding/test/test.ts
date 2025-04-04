import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'candid_encoding_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/candid_encoding';

const canisterName = 'candid_encoding';
const candidEncodingCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(candidEncodingCanister));
