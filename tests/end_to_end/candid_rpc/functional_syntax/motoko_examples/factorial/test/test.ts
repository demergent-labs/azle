import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

// @ts-ignore
import { createActor } from './dfx_generated/factorial';
import { getTests } from './tests';

const canisterName = 'factorial';
const factorialCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(factorialCanister), canisterName);
