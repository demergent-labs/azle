import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/guard_functions';
import { getTests } from './tests';

const guardFunctionsCanister = createActor(getCanisterId('guard_functions'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(guardFunctionsCanister));
