import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/outgoing_http_requests';
import { getTests } from './tests';

const outgoingHttpRequestsCanister = createActor(
    getCanisterId('outgoing_http_requests'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(outgoingHttpRequestsCanister));
