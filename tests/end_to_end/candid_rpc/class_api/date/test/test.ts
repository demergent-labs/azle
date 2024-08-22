import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'date_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/date';

const dateCanister = createActor(getCanisterId('date'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(dateCanister));
