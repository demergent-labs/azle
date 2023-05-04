import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/null_example';
import { getTests } from './tests';

const nullExampleCanister = createActor(getCanisterId('null_example'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(nullExampleCanister));
