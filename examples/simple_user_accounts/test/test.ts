import { run_tests } from 'azle/test';
import { createActor } from '../test/dfx_generated/simple_user_accounts';
import { get_tests } from './tests';

const simple_user_accounts_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

run_tests(get_tests(simple_user_accounts_canister));
