import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'key_value_store_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/key_value_store';

const canisterName = 'key_value_store';
const keyValueStoreCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(keyValueStoreCanister), canisterName);
