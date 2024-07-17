import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/hello_world';
import { getTests } from './tests';

const helloWorldCanister = createActor(getCanisterId('hello_world'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(helloWorldCanister));
