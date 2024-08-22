import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'simple_erc20_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/simple_erc20';

const simpleErc20Canister = createActor(getCanisterId('simple_erc20'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(simpleErc20Canister));
