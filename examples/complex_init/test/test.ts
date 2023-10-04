import { getCanisterId, runTests } from 'azle/test';
import { createActor as createComplexActor } from '../test/dfx_generated/complex_init';
import { createActor as createRecActor } from '../test/dfx_generated/rec_init';
import { get_rec_tests, get_tests } from './tests';

const complexInitCanister = createComplexActor(getCanisterId('complex_init'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const recInitCanister = createRecActor(getCanisterId('rec_init'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests([
    ...get_tests(complexInitCanister),
    ...get_rec_tests(recInitCanister)
]);
