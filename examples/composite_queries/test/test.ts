import { run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/canister1';
import { get_tests } from './tests';

const canister1 = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(get_tests(canister1));
