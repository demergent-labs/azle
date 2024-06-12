import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

// @ts-ignore
import { createActor } from './dfx_generated/hello_world';
import { getTests } from './tests';

const canisterName = 'hello_world';

const helloWorldCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterName, getTests(helloWorldCanister));
