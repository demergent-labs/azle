// TODO if these tests break just delete azle/examples/hello_world/node_modules

import { getCanisterId } from '../../../../../../dfx'; // We don't want to install Azle
import { runTests } from '../../../../../../test'; // We don't want to install Azle
import { createActor } from './dfx_generated/hello_world';
import { getTests } from './tests';

const helloWorldCanister = createActor(getCanisterId('hello_world'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(helloWorldCanister));
