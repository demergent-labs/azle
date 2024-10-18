import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/caller';
import { getTests } from './tests';

const callerCanister = createActor(getCanisterId('caller'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(callerCanister));
