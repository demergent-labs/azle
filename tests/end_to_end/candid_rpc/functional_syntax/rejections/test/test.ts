import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/rejections';
import { getTests } from './tests';

const canisterName = 'rejections';
const rejectionsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(rejectionsCanister), canisterName);
