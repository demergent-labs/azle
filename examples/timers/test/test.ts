import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/timers';
import { getTests } from './tests';

const timersCanister = createActor(getCanisterId('timers'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(timersCanister));
