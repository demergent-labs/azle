import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/candid_encoding';
import { getTests } from './tests';

const canisterName = 'candid_encoding';
const candidEncodingCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(candidEncodingCanister), canisterName);
