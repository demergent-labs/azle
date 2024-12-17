import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

// @ts-ignore
import { createActor } from './dfx_generated/echo';
import { getTests } from './tests';

const canisterName = 'echo';
const echoCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(echoCanister), canisterName);
