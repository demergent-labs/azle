import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/counter';
import { getTests } from './tests';

const counterCanister = createActor(getCanisterId('counter'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(counterCanister));
