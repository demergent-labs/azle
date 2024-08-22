import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'factorial_end_to_end_test_functional_api/test/tests';

// @ts-ignore
import { createActor } from './dfx_generated/factorial';

const factorialCanister = createActor(getCanisterId('factorial'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(factorialCanister));
