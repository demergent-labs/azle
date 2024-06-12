import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

// @ts-ignore
import { createActor } from './dfx_generated/quicksort';
import { getTests } from './tests';

const canisterName = 'quicksort';

const quicksortCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterName, getTests(quicksortCanister));
