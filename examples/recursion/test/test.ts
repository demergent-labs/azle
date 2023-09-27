import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/recursion';
import { getTests } from './tests';

const recursionCanister = createActor(getCanisterId('recursion'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(recursionCanister));
