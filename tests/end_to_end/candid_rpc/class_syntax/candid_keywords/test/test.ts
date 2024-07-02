import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'candid_keywords_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/candid_keywords';

const queryCanister = createActor(getCanisterId('candid_keywords'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(queryCanister));
