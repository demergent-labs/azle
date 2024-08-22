import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/proxy';
import { getTests } from './tests';

const proxyCanister = createActor(getCanisterId('proxy'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(proxyCanister));
