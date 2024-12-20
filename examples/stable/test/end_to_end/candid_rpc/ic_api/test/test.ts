import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'ic_api_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/ic_api';

const canisterName = 'ic_api';
const icApiCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        verifyQuerySignatures: false // TODO Major issue: https://forum.dfinity.org/t/agent-js-0-20-0-is-released-replica-signed-query-edition/24743/16?u=lastmjs
    }
});

runTests(getTests(icApiCanister as any), canisterName);
