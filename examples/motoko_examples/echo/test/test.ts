import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/echo';
import { getTests } from './tests';

const echoCanister = createActor(getCanisterId('echo'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(echoCanister));
