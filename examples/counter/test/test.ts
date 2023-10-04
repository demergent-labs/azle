import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/counter';
import { get_tests } from './tests';

const counterCanister = createActor(getCanisterId('counter'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(counterCanister));
