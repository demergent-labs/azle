import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/primitive_types';
import { get_tests } from './tests';

const primitive_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('primitive_types'),
    ...get_tests(primitive_types_canister)
];

run_tests(tests);
