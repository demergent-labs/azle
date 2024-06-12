import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

// @ts-ignore
import { createActor } from './dfx_generated/calc';
import { getTests } from './tests';

const canisterId = 'calc';

const calcCanister = createActor(getCanisterId(canisterId), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterId, getTests(calcCanister));
