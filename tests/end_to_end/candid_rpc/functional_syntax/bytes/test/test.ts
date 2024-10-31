import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/bytes_canister';
import { getTests } from './tests';

const canisterName = 'bytes_canister';
const bytesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(bytesCanister), canisterName);
