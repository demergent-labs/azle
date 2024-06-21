import { runTests } from 'azle/test';
import { getTests } from 'rejections_end_to_end_test_functional_syntax/test/tests';

import { getCanisterId } from '../../../dfx';
import { createActor } from './dfx_generated/rejections';

const rejectionsCanister = createActor(getCanisterId('rejections'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(rejectionsCanister));
