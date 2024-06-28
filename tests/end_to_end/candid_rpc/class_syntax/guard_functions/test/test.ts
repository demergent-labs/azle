import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'guard_functions_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/guard_functions';

const guardFunctionsCanister = createActor(getCanisterId('guard_functions'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(guardFunctionsCanister));
