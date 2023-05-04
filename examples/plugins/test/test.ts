import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/plugins';
import { getTests } from './tests';

const pluginsCanister = createActor(getCanisterId('plugins'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(pluginsCanister));
