import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'stable_memory_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/stable_memory';

const stableMemoryCanister = createActor(getCanisterId('stable_memory'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(stableMemoryCanister));
