import { run_tests } from 'azle/test';
import { createActor } from './dfx_generated/inspect_message';
import { get_tests } from './tests';

const inspect_message_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(get_tests(inspect_message_canister));
