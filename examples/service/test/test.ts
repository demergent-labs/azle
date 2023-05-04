import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/service';
import { getTests } from './tests';

const serviceCanister = createActor(getCanisterId('service'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(serviceCanister));
