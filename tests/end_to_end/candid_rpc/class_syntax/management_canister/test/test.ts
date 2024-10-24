import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'management_canister_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../test/dfx_generated/management_canister';

const canisterName = 'management_canister';
const managementCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(managementCanister), canisterName);
