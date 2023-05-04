import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/simple_erc20';
import { getTests } from './tests';

const simpleErc20Canister = createActor(getCanisterId('simple_erc20'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(simpleErc20Canister));
