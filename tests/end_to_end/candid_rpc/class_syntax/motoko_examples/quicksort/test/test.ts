import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';
import { getTests } from 'quicksort_end_to_end_test_functional_syntax/test/tests';

// @ts-ignore
import { createActor } from './dfx_generated/quicksort';

const quicksortCanister = createActor(getCanisterId('quicksort'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(quicksortCanister));
