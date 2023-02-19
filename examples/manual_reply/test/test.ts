import { run_tests } from 'azle/test';
import { createActor } from './dfx_generated/manual_reply';
import { get_tests } from './tests';

const manual_reply_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(get_tests(manual_reply_canister));
