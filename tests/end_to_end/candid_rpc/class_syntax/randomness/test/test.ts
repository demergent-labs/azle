import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'randomness_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/randomness';

const canisterName = 'randomness';
const randomnessCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(randomnessCanister), canisterName);
