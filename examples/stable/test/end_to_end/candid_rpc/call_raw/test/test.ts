import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'call_raw_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/call_raw';

const canisterName = 'call_raw';
const callRawCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(callRawCanister));
