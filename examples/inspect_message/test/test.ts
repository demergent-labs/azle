import { runTests } from 'azle/test';
import { createActor } from './dfx_generated/inspect_message';
import { getTests } from './tests';

const inspect_message_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(inspect_message_canister));
