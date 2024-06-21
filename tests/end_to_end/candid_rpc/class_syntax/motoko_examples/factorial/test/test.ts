import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';
import { getTests } from 'factorial_end_to_end_test_functional_syntax/test/tests';

// @ts-ignore
import { createActor } from './dfx_generated/factorial';

const factorialCanister = createActor(getCanisterId('factorial'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(factorialCanister));
