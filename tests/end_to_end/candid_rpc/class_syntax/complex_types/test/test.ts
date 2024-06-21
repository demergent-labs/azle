// TODO this needs to be more thoroughly tested

import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';
import { getTests } from 'complex_types_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../test/dfx_generated/complex_types';

const complex_types_canister = createActor(getCanisterId('complex_types'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(complex_types_canister));
