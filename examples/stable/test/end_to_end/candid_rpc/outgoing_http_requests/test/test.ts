import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'outgoing_http_requests_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/outgoing_http_requests';

const canisterName = 'outgoing_http_requests';
const outgoingHttpRequestsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(outgoingHttpRequestsCanister));
