import { runTests } from 'azle/test';
import { getCanisterId } from 'azle/dfx';
import { createActor } from '../test/dfx_generated/vanilla_js';
import { getTests } from './tests';

const vanillaJsCanister = createActor(getCanisterId('vanilla_js'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(vanillaJsCanister));
