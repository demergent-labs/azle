import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/key_value_store';
import { getTests } from './tests';

const canisterName = 'key_value_store';
const keyValueStoreCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(keyValueStoreCanister), canisterName);
