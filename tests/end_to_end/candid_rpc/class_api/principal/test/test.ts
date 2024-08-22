import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'principal_end_to_end_test_functional_api/test/tests';

import { createActor } from '../test/dfx_generated/principal';

const principalCanister = createActor(getCanisterId('principal'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(principalCanister));
