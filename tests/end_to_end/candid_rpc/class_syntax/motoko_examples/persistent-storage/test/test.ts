import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from './dfx_generated/persistent_storage';
import { getTests } from './tests';

const persistentStorageCanister = createActor(
    getCanisterId('persistent_storage'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(persistentStorageCanister));
