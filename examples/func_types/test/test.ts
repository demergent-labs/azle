import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/func_types';
import { get_tests } from './tests';

const func_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('func_types'),
    ...deploy('notifiers'),
    ...get_tests(func_types_canister)
];

run_tests(tests);
