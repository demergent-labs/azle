import { getCanisterId, runTests } from 'azle/test';
import { createActor } from './dfx_generated/quicksort';
import { getTests } from './tests';

const quicksortCanister = createActor(getCanisterId('quicksort'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(quicksortCanister));
