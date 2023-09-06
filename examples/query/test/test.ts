import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/query';
import { getTests } from './tests';

const queryCanister = createActor(getCanisterId('query'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(queryCanister));
