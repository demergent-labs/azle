import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'quicksort_end_to_end_test_functional_syntax/test/tests';

// @ts-ignore
import { createActor } from './dfx_generated/quicksort';

const canisterName = 'quicksort';
const quicksortCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(quicksortCanister), canisterName);
