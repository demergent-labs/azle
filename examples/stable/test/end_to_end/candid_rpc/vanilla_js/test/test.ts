import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'vanilla_js_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/vanilla_js';

const canisterName = 'vanilla_js';
const vanillaJsCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(vanillaJsCanister));
