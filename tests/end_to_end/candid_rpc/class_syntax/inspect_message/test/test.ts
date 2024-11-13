import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'inspect_message_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/inspect_message';

const canisterName = 'inspect_message';
const inspectMessageCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(inspectMessageCanister), canisterName);
