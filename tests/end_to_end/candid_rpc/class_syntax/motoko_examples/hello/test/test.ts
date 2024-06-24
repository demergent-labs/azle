import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

// @ts-ignore
import { createActor } from '../dfx_generated/hello';
import { getTests } from './tests';

const helloCanister = createActor(getCanisterId('hello'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(helloCanister));
