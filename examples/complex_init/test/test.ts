import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/complex_init';
import { get_tests } from './tests';

const complexInitCanister = createActor(getCanisterId('complex_init'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(complexInitCanister));
