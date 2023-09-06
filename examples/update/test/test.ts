import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/update';
import { getTests } from './tests';

const updateCanister = createActor(getCanisterId('update'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(updateCanister));
