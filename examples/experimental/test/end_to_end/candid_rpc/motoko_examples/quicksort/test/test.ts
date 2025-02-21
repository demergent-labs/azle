import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

// @ts-ignore
import { createActor } from './dfx_generated/quicksort';
import { getTests } from './tests';

const canisterName = 'quicksort';
const quicksortCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(quicksortCanister), canisterName);
