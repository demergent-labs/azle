import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';
import { getTests } from 'call_raw_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../test/dfx_generated/call_raw';

const callRawCanister = createActor(getCanisterId('call_raw'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(callRawCanister));
