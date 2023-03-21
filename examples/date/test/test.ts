import { runTests } from 'azle/test';
import { createActor } from './dfx_generated/date';
import { getTests } from './tests';

const date_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(date_canister));
