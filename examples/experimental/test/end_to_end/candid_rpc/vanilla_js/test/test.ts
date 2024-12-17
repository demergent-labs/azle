import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/vanilla_js';
import { getTests } from './tests';

const canisterName = 'vanilla_js';
const vanillaJsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(vanillaJsCanister), canisterName);
