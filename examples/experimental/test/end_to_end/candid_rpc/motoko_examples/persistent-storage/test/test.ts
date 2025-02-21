import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/persistent_storage';
import { getTests } from './tests';

const canisterName = 'persistent_storage';
const persistentStorageCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(persistentStorageCanister), canisterName);
