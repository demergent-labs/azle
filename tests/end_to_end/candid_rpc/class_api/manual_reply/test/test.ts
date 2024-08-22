import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'manual_reply_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/manual_reply';

const manualReplyCanister = createActor(getCanisterId('manual_reply'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(manualReplyCanister));
