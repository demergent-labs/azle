import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'blob_array_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/blob_array';

const blobCanister = createActor(getCanisterId('blob_array'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(blobCanister));
