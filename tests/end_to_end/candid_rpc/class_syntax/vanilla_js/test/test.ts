import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'vanilla_js_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../test/dfx_generated/vanilla_js';

const vanillaJsCanister = createActor(getCanisterId('vanilla_js'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(vanillaJsCanister));
