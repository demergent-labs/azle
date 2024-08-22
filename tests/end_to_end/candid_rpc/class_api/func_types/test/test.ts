import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'func_types_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/func_types';

const funcTypesCanister = createActor(getCanisterId('func_types'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(funcTypesCanister));
