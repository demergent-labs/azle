import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/pre_and_post_upgrade';
import { get_tests } from './tests';

const pre_and_post_upgrade_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    ...deploy('pre_and_post_upgrade'),
    ...get_tests(pre_and_post_upgrade_canister)
];

run_tests(tests);
