import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'call_raw_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../test/dfx_generated/call_raw';

const canisterName = 'call_raw';
const callRawCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(callRawCanister), canisterName);
