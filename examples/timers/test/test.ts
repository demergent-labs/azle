import { run_tests } from 'azle/test';
import { createActor } from './dfx_generated/timers';
import { get_tests } from './tests';

const timers_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(get_tests(timers_canister));
