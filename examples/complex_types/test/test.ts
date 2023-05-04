// TODO this needs to be more thoroughly tested

import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/complex_types';
import { get_tests } from './tests';

const complex_types_canister = createActor(getCanisterId('complex_types'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(complex_types_canister));
