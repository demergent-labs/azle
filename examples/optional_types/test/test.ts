import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/optional_types';
import { get_tests } from './tests';

const optional_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('optional_types'),
    ...get_tests(optional_types_canister)
];

run_tests(tests);
