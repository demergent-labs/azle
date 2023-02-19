import { run_tests } from 'azle/test';
import { createActor } from './dfx_generated/date';
import { get_tests } from './tests';

const date_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(get_tests(date_canister));
