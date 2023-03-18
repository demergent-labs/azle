import { run_tests } from 'azle/test';
import { createActor } from '../test/dfx_generated/inline_types';
import { getTests } from './tests';

const inline_types_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(getTests(inline_types_canister));
