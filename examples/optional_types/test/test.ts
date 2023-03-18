import { run_tests } from 'azle/test';
import { createActor } from '../test/dfx_generated/optional_types';
import { getTests } from './tests';

const optionalTypesCanister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(getTests(optionalTypesCanister));
