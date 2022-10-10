import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/rejections';
import { get_tests } from './tests';

const rejections_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('rejections'),
    ...deploy('some_service'),
    ...get_tests(rejections_canister)
];

run_tests(tests);
