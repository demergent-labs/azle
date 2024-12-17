import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/manual_reply';
import { getTests } from './tests';

const canisterName = 'manual_reply';
const manualReplyCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(manualReplyCanister), canisterName);
