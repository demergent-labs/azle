import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/outgoing_http_requests';
import { getTests } from './tests';

const canisterName = 'outgoing_http_requests';
const outgoingHttpRequestsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(outgoingHttpRequestsCanister));
