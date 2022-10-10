import { deploy, run_tests, Test } from 'azle/test';
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

const tests: Test[] = [
    ...deploy('simple_user_accounts'),
    ...get_tests(simple_user_accounts_canister)
];

run_tests(tests);
