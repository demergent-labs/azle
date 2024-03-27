import { runTests } from 'azle/test';
import { getCanisterId } from 'azle/dfx';
import { createActor } from './dfx_generated/candid_keywords';
import { getTests } from './tests';

const queryCanister = createActor(getCanisterId('candid_keywords'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(queryCanister));
