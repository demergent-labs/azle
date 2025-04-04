import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'key_value_store_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/key_value_store';

const canisterName = 'key_value_store';
const keyValueStoreCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(keyValueStoreCanister));
