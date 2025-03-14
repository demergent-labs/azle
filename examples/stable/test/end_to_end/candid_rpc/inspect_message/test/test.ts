import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'inspect_message_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/inspect_message';

const canisterName = 'inspect_message';
const inspectMessageCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(inspectMessageCanister));
