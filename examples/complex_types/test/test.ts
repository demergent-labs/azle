// TODO this needs to be more thoroughly tested

import { runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/complex_types';
import { get_tests } from './tests';

const complex_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(complex_types_canister));
