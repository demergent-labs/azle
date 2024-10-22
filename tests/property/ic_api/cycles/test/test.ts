import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/intermediary';
import { getTests } from './tests';

const intermediaryCanister = createActor(getCanisterId('intermediary'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(intermediaryCanister));
