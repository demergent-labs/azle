import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'simple_user_accounts_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/simple_user_accounts';

const canisterName = 'simple_user_accounts';
const simpleUserAccountsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(simpleUserAccountsCanister), canisterName);
