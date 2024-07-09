import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/call_raw';
import { getTests } from './tests';

const callRawCanister = createActor(getCanisterId('call_raw'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(callRawCanister));
