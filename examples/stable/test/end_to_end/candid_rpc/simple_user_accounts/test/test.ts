import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/simple_user_accounts';
import { getTests } from './tests';

const canisterName = 'simple_user_accounts';
const simpleUserAccountsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(simpleUserAccountsCanister));
