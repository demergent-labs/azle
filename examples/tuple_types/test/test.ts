import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/tuple_types';
import { get_tests } from './tests';

const tuple_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('tuple_types'),
    ...get_tests(tuple_types_canister)
];

run_tests(tests);
