import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

// @ts-ignore
import { createActor } from './dfx_generated/counter';
import { getTests } from './tests';

const canisterName = 'counter';

const counterCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterName, getTests(counterCanister));
