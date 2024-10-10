import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/simple_user_accounts';
import { getTests } from './tests';

const canisterName = 'simple_user_accounts';
const simpleUserAccountsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(simpleUserAccountsCanister), canisterName);
