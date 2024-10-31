import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/inspect_message';
import { getTests } from './tests';

const canisterName = 'inspect_message';
const inspectMessageCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(inspectMessageCanister), canisterName);
