import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/blob_array';
import { get_tests } from './tests';

const blobCanister = createActor(getCanisterId('blob_array'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(blobCanister));
