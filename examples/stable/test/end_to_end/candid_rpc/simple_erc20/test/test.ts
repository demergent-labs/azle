import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'simple_erc20_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/simple_erc20';

const canisterName = 'simple_erc20';
const simpleErc20Canister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(simpleErc20Canister));
