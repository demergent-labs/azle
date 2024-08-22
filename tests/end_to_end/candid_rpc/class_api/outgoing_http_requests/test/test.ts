import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'outgoing_http_requests_end_to_end_test_functional_api/test/tests';

import { createActor } from './dfx_generated/outgoing_http_requests';

const outgoingHttpRequestsCanister = createActor(
    getCanisterId('outgoing_http_requests'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(outgoingHttpRequestsCanister));
