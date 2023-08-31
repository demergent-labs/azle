import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/factorial';
import { getTests } from './tests';

const factorialCanister = createActor(getCanisterId('factorial'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(factorialCanister));
