import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';
import { getTests } from 'query_end_to_end_test_canister_syntax/test/tests';

import { createActor } from './dfx_generated/query';

const queryCanister = createActor(getCanisterId('query'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(queryCanister));
