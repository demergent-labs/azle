import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'rejections_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/rejections';

const canisterName = 'rejections';
const rejectionsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(rejectionsCanister));
