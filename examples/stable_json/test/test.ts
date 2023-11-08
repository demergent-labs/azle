import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/stable_json';
import { getTests } from './tests';

const stableJsonCanister = createActor(getCanisterId('stable_json'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(stableJsonCanister));
