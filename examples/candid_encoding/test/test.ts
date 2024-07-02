import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/candid_encoding';
import { getTests } from './tests';

const candidEncodingCanister = createActor(getCanisterId('candid_encoding'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(candidEncodingCanister));
