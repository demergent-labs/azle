import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'simple_user_accounts_end_to_end_test_canister_syntax/test/tests';

import { createActor } from './dfx_generated/simple_user_accounts';

const simpleUserAccountsCanister = createActor(
    getCanisterId('simple_user_accounts'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(simpleUserAccountsCanister));
