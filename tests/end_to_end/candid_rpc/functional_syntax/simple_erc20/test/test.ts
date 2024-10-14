import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/simple_erc20';
import { getTests } from './tests';

const canisterName = 'simple_erc20';
const simpleErc20Canister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(simpleErc20Canister), canisterName);
