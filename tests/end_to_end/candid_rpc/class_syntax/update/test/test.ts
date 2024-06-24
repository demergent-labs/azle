import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'update_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/update';

const updateCanister = createActor(getCanisterId('update'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(updateCanister));
