import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'counter_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/counter';

const counterCanister = createActor(getCanisterId('counter'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(counterCanister));
