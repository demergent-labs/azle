import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'simple_user_accounts_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/simple_user_accounts';

const canisterName = 'simple_user_accounts';
const simpleUserAccountsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(simpleUserAccountsCanister));
