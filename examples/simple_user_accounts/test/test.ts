import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/simple_user_accounts';
import { getTests } from './tests';

const simpleUserAccountsCanister = createActor(
    getCanisterId('simple_user_accounts'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(simpleUserAccountsCanister));
