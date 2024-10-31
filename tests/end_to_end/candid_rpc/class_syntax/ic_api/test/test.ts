import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'ic_api_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/ic_api';

const canisterName = 'ic_api';
const icApiCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(icApiCanister as any), canisterName);
