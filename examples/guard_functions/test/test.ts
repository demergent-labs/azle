import { runTests } from 'azle/test';
import { createActor } from './dfx_generated/guard_functions';
import { get_tests } from './tests';

const guard_functions_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(guard_functions_canister));
