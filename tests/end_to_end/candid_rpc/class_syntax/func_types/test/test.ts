import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';
import { getTests } from 'func_types_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/func_types';

const func_types_canister = createActor(getCanisterId('func_types'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(func_types_canister));
