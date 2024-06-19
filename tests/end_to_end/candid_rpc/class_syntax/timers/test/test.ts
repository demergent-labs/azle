import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'timers_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/timers';

const timersCanister = createActor(getCanisterId('timers'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(timersCanister));
