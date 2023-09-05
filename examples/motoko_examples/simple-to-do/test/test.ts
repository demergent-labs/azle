import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/simple_to_do/';
import { getTests } from './tests';

const todoCanister = createActor(getCanisterId('simple_to_do'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(todoCanister));
