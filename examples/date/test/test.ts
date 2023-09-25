import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/date';
import { getTests } from './tests';

const dateCanister = createActor(getCanisterId('date'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(dateCanister));
