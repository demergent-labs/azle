import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/stable_memory';
import { getTests } from './tests';

const stableMemoryCanister = createActor(getCanisterId('stable_memory'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(stableMemoryCanister));
