import { runTests } from 'azle/test';
import { createActor } from './dfx_generated/stable_memory';
import { getTests } from './tests';

const stableMemoryCanister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(stableMemoryCanister));
